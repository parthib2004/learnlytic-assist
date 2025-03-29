import { Brain, FileText, CheckCircle, LineChart, BookOpen, Accessibility } from "lucide-react";

const features = [
  {
    title: "AI-Powered Detection",
    description: "Early detection of learning disabilities like Dyslexia, ADHD, and Dysgraphia through advanced AI analysis.",
    icon: Brain,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Writing Pattern Analysis",
    description: "Analyze writing patterns to identify potential markers for learning disabilities with high accuracy.",
    icon: FileText,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Personalized Learning Plans",
    description: "Generate individualized learning plans tailored to each student's specific needs and learning style.",
    icon: CheckCircle,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Teacher Insights Dashboard",
    description: "Provide educators with actionable insights and progress tracking for students with learning disabilities.",
    icon: LineChart,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Adaptive Learning Content",
    description: "Content that adapts to the student's needs, making learning more accessible and effective.",
    icon: BookOpen,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Accessibility Tools",
    description: "Built-in accessibility tools like text-to-speech, simplified notes, and task scheduling assistance.",
    icon: Accessibility,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering Every Learner
          </h2>
          <p className="text-lg text-gray-600">
            Our AI-powered platform helps identify learning disabilities early and 
            provides personalized support for student success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
