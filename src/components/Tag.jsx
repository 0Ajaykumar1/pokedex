const Tag = ({ name }) => {
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 14)];
    }
    return color;
  }

  return (
    <li className="tag-item" style={{ backgroundColor: getRandomColor() }}>
      <span>{name}</span>
    </li>
  );
};

export default Tag;
