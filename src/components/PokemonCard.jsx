import { Link } from "react-router-dom";

const PokemonCard = ({ name, id, img }) => {
  return (
    <>
      <div className="img-wrapper">
        <Link to={`/pokemon/${id}`}>
          <img src={img} width="100" height="100" alt="" />
        </Link>
      </div>
      <div className="name-wrapper">
        <h4 className="pok-name">{name}</h4>
        <span>#{`000${id}`.slice(-3)}</span>
      </div>
    </>
  );
};

export default PokemonCard;
