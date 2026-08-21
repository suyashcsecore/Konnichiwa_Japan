function GarbageItem({ item, onDragStart }) {
  return (
    <div
      className="garbage-item"
      draggable
      onDragStart={() => onDragStart(item)}
    >
      <span>{item.name}</span>
    </div>
  );
}

export default GarbageItem;