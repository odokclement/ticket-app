interface StatusDisplayProps {
  status: string;
}

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  // Define a mapping of status to color
  const getColor = (status: string) => {
    let color = "bg-slate-700";
    switch (status.toLocaleLowerCase()) {
      case "done":
        color = "bg-green-200";
        return color;
      case "in progress":
        color = "bg-yellow-200";
        return color;
      case "not started":
        color = "bg-red-200";
        return color;
      default:
        return "bg-slate-700";
    }
  };

  return (
    <span className={`inline-block rounded-full px-2 py-1 text-slate-600 text-xs font-semibold text-grey-700 mr-2 mb-2 ${getColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusDisplay;
