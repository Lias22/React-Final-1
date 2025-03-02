import React, { useState, useEffect } from "react";

const MovieCard = ({ movie }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [lightX, setLightX] = useState("50%");
  const [lightY, setLightY] = useState("50%");
  const [expanded, setExpanded] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;

    const xRotation = ((offsetY - clientHeight / 2) / clientHeight) * 20;
    const yRotation = ((offsetX - clientWidth / 2) / clientWidth) * 20;

    const shadowOffsetX = (offsetX - clientWidth / 2) * 0.3;
    const shadowOffsetY = (offsetY - clientHeight / 2) * 0.3;

    const lightXPosition = `${(offsetX / clientWidth) * 100}%`;
    const lightYPosition = `${(offsetY / clientHeight) * 100}%`;

    setRotateX(xRotation);
    setRotateY(yRotation);
    setShadowX(shadowOffsetX);
    setShadowY(shadowOffsetY);
    setLightX(lightXPosition);
    setLightY(lightYPosition);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadowX(0);
    setShadowY(0);
    setLightX("50%");
    setLightY("50%");
    setExpanded(false);
    clearTimeout(timer);
  };

  const handleMouseEnter = () => {
    const newTimer = setTimeout(() => {
      setExpanded(true); // Expande la tarjeta después de 5 segundos
    }, 5000); // 5000ms = 5 segundos

    setTimer(newTimer);
  };

  return (
    <div
      className="movie-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${expanded ? 1.2 : 1})`,
        boxShadow: `${-shadowX}px ${-shadowY}px 20px rgba(0, 0, 0, 0.5)`,
        background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255, 255, 255, 0.2), transparent)`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      }}
    >
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      {expanded && (
        <div className="movie-description">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio labore aut facere ea aspernatur optio quasi aliquid qui nemo modi voluptas.</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;



