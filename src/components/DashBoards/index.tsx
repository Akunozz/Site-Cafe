interface DashboardCardProps {
  title: string;
  content: string;
}

function DashboardCard({ title, content }: DashboardCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-gray-500 mt-2">{content}</p>
    </div>
  );
}

export default DashboardCard;
