import { motion } from "framer-motion";
import { CheckCircle, Users, Target } from "lucide-react";

const stats = [
  {
    value: "99%",
    label: "Accuracy",
    sublabel: "in detection",
    icon: CheckCircle,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
  },
  {
    value: "10k+",
    label: "Students",
    sublabel: "were helped",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    value: "3+",
    label: "Disabilities",
    sublabel: "detected",
    icon: Target,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

const StatsSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4 min-w-[150px] flex-1"
        >
          <div className={`${stat.bgColor} p-3 rounded-full flex-shrink-0`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className={`text-xl font-semibold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-gray-700 truncate">
                {stat.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {stat.sublabel}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection; 