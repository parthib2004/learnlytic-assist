import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

const AIAnalysisCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden border"
    >
      {/* Window Controls */}
      <div className="p-5 border-b bg-gray-50">
        <div className="flex items-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-red-500 mr-2"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 rounded-full bg-yellow-500 mr-2"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 rounded-full bg-green-500"
          />
          <div className="ml-4 text-sm text-gray-500">Personalized Learning Analysis</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <div className="flex items-center mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white"
          >
            <Bot className="h-5 w-5" />
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-1 -top-1"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="ml-4 bg-purple-50 p-3 rounded-lg rounded-tl-none shadow-sm"
          >
            <p className="text-sm text-gray-800">
              Based on the writing sample, I've detected patterns consistent with dyslexia.
            </p>
          </motion.div>
        </div>

        {/* Analysis Progress */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-6"
        >
          <motion.div 
            className="bg-gray-100 p-3 rounded-lg mb-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mb-2"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full"
            />
          </motion.div>
          <motion.div 
            className="ml-auto bg-gray-100 p-3 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mb-2"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xs text-gray-500"
          >
            Generating learning plan...
          </motion.div>
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalysisCard; 