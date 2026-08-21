function GarbageBin({
  title,
  category,
  onDrop,
  items
}) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="garbage-bin"
      onDragOver={handleDragOver}
      onDrop={() => onDrop(category)}
    >
      <h3>{title}</h3>

      <div className="bin-items">
        {items.map((item) => (
          <div key={item.id} className="placed-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GarbageBin;