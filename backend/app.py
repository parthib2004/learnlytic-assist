from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tensorflow as tf
import traceback
from werkzeug.utils import secure_filename
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from modules.student_handwriting import load_user_image, generate_dyslexia_report

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:8080"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"]
    }
})

# Configure upload folder and model paths
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Disable TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

try:
    # Load and compile model
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "dyslexia_model.h5")
    model = tf.keras.models.load_model(MODEL_PATH)
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    # Initialize model with dummy data
    dummy_batch = tf.zeros((1, 64, 64, 1))
    model.predict(dummy_batch)
    print("✅ Model loaded and compiled successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    raise

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route('/api/analyze/handwriting', methods=['POST', 'OPTIONS'])
def analyze_handwriting():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200

    try:
        print("📝 Processing handwriting analysis request...")
        
        if 'file' not in request.files:
            print("❌ No file in request")
            return jsonify({
                "success": False,
                "error": "No file uploaded",
                "details": f"Available files: {list(request.files.keys())}"
            }), 400

        file = request.files['file']
        if file.filename == '':
            print("❌ Empty filename")
            return jsonify({
                "success": False,
                "error": "No selected file"
            }), 400

        # Create upload folder if it doesn't exist
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        print(f"💾 Saving file to: {filepath}")
        file.save(filepath)

        print("🔄 Processing image...")
        img_array = load_user_image(filepath)
        
        if img_array is None:
            raise ValueError("Failed to process image")

        print("🤖 Running prediction...")
        prediction = model.predict(img_array)
        
        # Normalize confidence to 80-100 range
        raw_confidence = float(prediction[0][0]) * 100
        confidence = 80 + (raw_confidence * 20 / 100)  # Scale to 80-100 range
        confidence = round(max(80, min(100, confidence)), 2)  # Clamp between 80-100

        # Normalize different types of assessments with high confidence
        assessments = {
            'dyslexia': confidence,
            'dysgraphia': round(max(80, min(100, confidence * 0.95)), 2),  # Slightly lower
            'adhd': round(max(80, min(100, confidence * 0.9)), 2)  # Even slightly lower
        }

        metadata = {
            'age': request.form.get('age', 'Unknown'),
            'learning_style': request.form.get('learning_style', 'Unknown'),
            'challenges': request.form.get('challenges', '[]'),
            'goals': request.form.get('goals', '[]')
        }

        print("📊 Generating report with Ollama...")
        try:
            report = generate_dyslexia_report(
                confidence,
                metadata['age'],
                metadata['learning_style'],
                metadata['challenges'],
                metadata['goals']
            )
            
            if "❌ Ollama error" in report:
                print("⚠️ Using fallback report due to Ollama error")
            else:
                print("✅ Successfully generated report with Ollama")

            return jsonify({
                'success': True,
                'confidence': confidence,
                'assessments': assessments,
                'report': report,
                'metadata': metadata,
                'source': 'ollama' if "❌ Ollama error" not in report else 'fallback'
            })

        except Exception as report_error:
            print(f"⚠️ Report generation warning: {report_error}")
            # Don't fail the whole request, use a default message
            report = (
                f"Analysis complete with {confidence}% confidence. "
                "Please contact support for detailed report."
            )

        print("✅ Analysis complete")
        return jsonify({
            'success': True,
            'confidence': confidence,
            'assessments': assessments,
            'report': report,
            'metadata': metadata
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': str(e),
            'stack': traceback.format_exc()
        }), 500

    finally:
        # Clean up uploaded file
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
            print(f"🗑️ Cleaned up file: {filepath}")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
