export const Nutrition = ({
  data,
}: {
  data: {
    id: number;
    title: string;
    value: string;
    icon: JSX.Element;
  }[];
}) => {
  return (
    <div className="flex flex-col gap-10">
      {data.map(({ id,title, value, icon }) => (
        <div key={id} className="bg-secondary w-64 h-32 rounded flex items-center">
          <div className="w-16 h-16 m-8 mr-6">{icon}</div>
          <div className="flex flex-col">
            <div className="text-zinc-800 text-xl font-bold">{value}</div>
            <div className="text-gray-500 text-sm font-medium">{title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
