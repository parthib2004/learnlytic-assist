
import { Brain, FileText, CheckCircle, LineChart, BookOpen, UserCheck } from "lucide-react";

const features = [
  {
    name: "AI-Powered Detection",
    description:
      "Early detection of learning disabilities like Dyslexia, ADHD, and Dysgraphia through advanced AI analysis.",
    icon: Brain,
  },
  {
    name: "Writing Pattern Analysis",
    description:
      "Analyze writing patterns to identify potential markers for learning disabilities with high accuracy.",
    icon: FileText,
  },
  {
    name: "Personalized Learning Plans",
    description:
      "Generate individualized learning plans tailored to each student's specific needs and learning style.",
    icon: CheckCircle,
  },
  {
    name: "Teacher Insights Dashboard",
    description:
      "Provide educators with actionable insights and progress tracking for students with learning disabilities.",
    icon: LineChart,
  },
  {
    name: "Adaptive Learning Content",
    description:
      "Content that adapts to the student's needs, making learning more accessible and effective.",
    icon: BookOpen,
  },
  {
    name: "Accessibility Tools",
    description:
      "Built-in accessibility tools like text-to-speech, simplified notes, and task scheduling assistance.",
    icon: UserCheck,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Empowering Every Learner
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform helps identify learning disabilities early and provides
            personalized support for student success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
