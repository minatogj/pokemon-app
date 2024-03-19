// eslint-disable-next-line react/prop-types
const PokemonThumbnails = ({ id, jpName, iconImage, image, jpType, type }) => {
  const style = `thumb-container ${type}`;

  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt="" />
      <img src={iconImage} alt={jpName} className="icon-image" />
      <div className="detail-wrapper">
        <h4>{jpName}</h4>
        <h3>{jpType}</h3>
      </div>
    </div>
  );
};

export default PokemonThumbnails;
