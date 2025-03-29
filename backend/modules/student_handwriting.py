from keras.preprocessing.image import load_img, img_to_array
import numpy as np
import ollama
import os
import tensorflow as tf

def load_user_image(image_path):
    try:
        image_size = (64, 64)
        img = load_img(image_path, target_size=image_size, color_mode="grayscale")
        img_array = img_to_array(img)
        img_array = img_array / 255.0  # Normalize
        img_array = tf.convert_to_tensor(img_array.reshape(1, 64, 64, 1))  # Convert to tensor
        return img_array
    except Exception as e:
        print(f"❌ Error loading image: {e}")
        return None

def generate_dyslexia_report(confidence, age, learning_style, challenges, goals):
    try:
        # First check if Ollama is running
        try:
            # Test connection with a simple ping
            test_response = ollama.chat(model='gemma:2b', messages=[
                {"role": "user", "content": "test"}
            ])
            print("✅ Ollama connection successful")
        except Exception as conn_error:
            print(f"❌ Ollama connection error: {conn_error}")
            raise Exception("Ollama service not available")

        prompt = f"""You are an expert in analyzing dyslexia patterns. Given the following assessment data:

        Handwriting Analysis Results:
        - Dyslexia Confidence: {confidence}%
        - Student Age: {age}
        - Learning Style: {learning_style}
        - Current Challenges: {challenges}
        - Learning Goals: {goals}

        Please provide:
        1. A detailed analysis of the results
        2. Specific recommendations based on the learning style
        3. Actionable next steps for improvement
        4. Study strategies tailored to their challenges
        
        Format the response in clear sections with bullet points where appropriate.
        """

        response = ollama.chat(model='gemma:2b', messages=[
            {
                "role": "system", 
                "content": "You are an expert educational psychologist specializing in dyslexia assessment."
            },
            {
                "role": "user", 
                "content": prompt
            }
        ], timeout=30)  # Add timeout to prevent hanging

        if response and 'message' in response and 'content' in response['message']:
            return response['message']['content']
        else:
            raise Exception("Invalid response format from Ollama")

    except Exception as e:
        print(f"❌ Ollama error: {e}")
        print("⚠️ Falling back to template-based report")
        return create_fallback_report(confidence, age, learning_style, challenges, goals)

def create_fallback_report(confidence, age, learning_style, challenges, goals):
    severity = "high" if confidence > 70 else "moderate" if confidence > 40 else "low"
    
    templates = {
        "high": f"""
Based on the handwriting analysis, there are strong indicators of dyslexia ({confidence}% confidence).

Key Observations:
- Significant patterns consistent with dyslexia detected
- Age-appropriate considerations for {age} years old
- Learning style: {learning_style}

Recommendations:
1. Consider professional dyslexia assessment
2. Implement specialized reading and writing tools
3. Focus on phonological awareness exercises
4. Regular progress monitoring
5. Multi-sensory learning approaches

Personal Goals Focus:
{', '.join(eval(goals) if isinstance(goals, str) else goals)}

Next Steps:
1. Schedule educational support consultation
2. Explore assistive technologies
3. Develop personalized learning strategies
        """,
        "moderate": f"""
The analysis shows moderate indicators of dyslexia-related patterns ({confidence}% confidence).

Key Points:
- Some characteristics associated with dyslexia present
- Age-specific analysis for {age} years old
- Preferred learning style: {learning_style}

Suggested Approaches:
1. Monitor reading and writing development
2. Implement supportive learning strategies
3. Consider additional assessment if challenges persist

Areas to Focus:
{', '.join(eval(challenges) if isinstance(challenges, str) else challenges)}
        """,
        "low": f"""
Analysis shows minimal dyslexia indicators ({confidence}% confidence).

Overview:
- Few patterns associated with dyslexia detected
- Age-appropriate development for {age} years old
- Learning style preference: {learning_style}

Recommendations:
1. Continue regular learning activities
2. Monitor progress
3. Maintain current support systems

Learning Goals:
{', '.join(eval(goals) if isinstance(goals, str) else goals)}
        """
    }
    
    return templates[severity].strip()
