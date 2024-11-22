import React from "react";
import { AccountCircle } from "./AccountCircle";
import avengers2 from "./avengers-2.png";
import avengers3 from "./avengers-3.png";
import avengers from "./avengers.png";
import downArrowBackup2SvgrepoCom1 from "./down-arrow-backup-2-svgrepo-com-1.svg";
import image1 from "./image.png";
import image from "./image.svg";
import maxresdefault1 from "./maxresdefault-1.png";
import playSvgrepoCom1 from "./play-svgrepo-com-1.svg";
import "./TitleScreen.css";
import thumbnail2 from "./thumbnail-2.png";
import thumbnail3 from "./thumbnail-3.png";
import thumbnail4 from "./thumbnail-4.png";
import thumbnail5 from "./thumbnail-5.png";
import vector from "./vector.svg";
import whattowatchlogobold1 from "./whattowatchlogobold-1.png";

export const TitleScreen = () => {
  return (
    <div className="macbook-air">
      <div className="div">
        <AccountCircle className="account-circle" />
        <div className="navbar">
          <div className="text-wrapper">Movies</div>

          <div className="text-wrapper-2">Television</div>

          <div className="text-wrapper-3">Animation</div>

          <div className="text-wrapper-4">Forum</div>

          <div className="text-wrapper-5">My Lists</div>
        </div>

        <div className="text-wrapper-6">Marvel</div>

        <div className="overlap">
          <div className="overlap-group">
            <div className="overlap-2">
              <div className="text-wrapper-7">The Avengers</div>

              <div className="text-wrapper-8">Action Adventure</div>
            </div>

            <div className="play-svgrepo-com-wrapper">
              <img
                className="play-svgrepo-com"
                alt="Play svgrepo com"
                src={playSvgrepoCom1}
              />
            </div>
          </div>

          <p className="director-joss-whedon">
            <span className="span">Director:</span>

            <span className="text-wrapper-9"> Joss Whedon</span>
          </p>

          <p className="release-date-may">
            <span className="span">Release Date:</span>

            <span className="text-wrapper-9"> May 4th 2012</span>
          </p>

          <p className="imdb">
            <span className="span">IMDb: </span>

            <span className="text-wrapper-9">8.1/10</span>
          </p>

          <p className="rating">
            <span className="span">Rating: </span>

            <span className="text-wrapper-9">12A</span>
          </p>

          <div className="div-wrapper">
            <div className="text-wrapper-10">Add to My List</div>
          </div>
        </div>

        <img className="thumbnail" alt="Thumbnail" src={thumbnail2} />

        <img className="img" alt="Thumbnail" src={thumbnail3} />

        <img className="thumbnail-2" alt="Thumbnail" src={thumbnail4} />

        <img className="thumbnail-3" alt="Thumbnail" src={thumbnail5} />

        <div className="overlap-3">
          <div className="rectangle" />

          <img
            className="down-arrow-backup"
            alt="Down arrow backup"
            src={downArrowBackup2SvgrepoCom1}
          />
        </div>

        <div className="text-wrapper-11">Synopsis</div>

        <div className="overlap-4">
          <div className="text-wrapper-12">More Titles Like This</div>

          <div className="group">
            <div className="property-default">
              <div className="overlap-group-2">
                <img className="img-2" alt="Avengers" src={avengers} />

                <div className="text-wrapper-13">Marvel</div>

                <div className="text-wrapper-14">The Avengers</div>

                <div className="text-wrapper-15">Action Adventure</div>

                <p className="p">
                  Cast: Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett
                  Johannson
                </p>

                <div className="rectangle-2" />

                <div className="ellipse" />

                <div className="ellipse-2" />

                <div className="ellipse-3" />

                <div className="ellipse-4" />

                <img className="vector" alt="Vector" src={vector} />
              </div>
            </div>

            <div className="property">
              <div className="overlap-group-2">
                <img className="img-2" alt="Avengers" src={image1} />

                <div className="text-wrapper-13">Warner Bros.</div>

                <div className="text-wrapper-14">Interstellar</div>

                <div className="text-wrapper-15">Thriller Sci-Fi</div>

                <div className="rectangle-2" />

                <div className="ellipse" />

                <div className="ellipse-2" />

                <div className="ellipse-3" />

                <div className="ellipse-4" />

                <img
                  className="img-2"
                  alt="Maxresdefault"
                  src={maxresdefault1}
                />

                <p className="text-wrapper-16">
                  Cast: Matthew McConaughey, Michael Caine, Anne Hathaway
                </p>
              </div>
            </div>

            <div className="property-variant">
              <img className="avengers" alt="Avengers" src={avengers2} />

              <div className="overlap-5">
                <div className="text-wrapper-13">Marvel</div>

                <div className="text-wrapper-14">The Avengers</div>

                <div className="text-wrapper-15">Action Adventure</div>

                <p className="p">
                  Cast: Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett
                  Johannson
                </p>

                <div className="rectangle-2" />

                <div className="ellipse" />

                <div className="ellipse-2" />

                <div className="ellipse-3" />

                <div className="ellipse-4" />
              </div>
            </div>

            <div className="property-2">
              <img className="avengers-2" alt="Avengers" src={avengers3} />

              <div className="overlap-5">
                <div className="text-wrapper-13">Marvel</div>

                <div className="text-wrapper-14">The Avengers</div>

                <div className="text-wrapper-15">Action Adventure</div>

                <p className="p">
                  Cast: Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett
                  Johannson
                </p>

                <div className="rectangle-2" />

                <div className="ellipse" />

                <div className="ellipse-2" />

                <div className="ellipse-3" />

                <div className="ellipse-4" />
              </div>
            </div>
          </div>

          <img className="vector-2" alt="Vector" src={image} />
        </div>

        <p className="nam-eu-nibh-est-cras">
          Nam eu nibh est. Cras sit amet orci leo. Fusce interdum eleifend
          pretium. Sed porttitor leo ut tristique molestie.
          <br />
          Aenean a magna pharetra, varius elit et, sodales mauris. Pellentesque
          malesuada, nibh commodo mollis aliquam, sapien ipsum
          <br />
          faucibus enim, vitae cursus arcu sapien ut quam. Donec eu ligula mi.
          In vel nisi tempus nulla sagittis interdum et vel nibh.
          <br />
          Curabitur ullamcorper est est, non iaculis erat blandit quis. Donec
          pulvinar egestas nulla vitae malesuada. Integer commodo <br />
          rhoncus dui, non malesuada lectus porttitor a. Vivamus urna leo,
          sollicitudin quis imperdiet non, sollicitudin sit amet ligula. <br />
          Fusce dui lectus, sagittis ut pulvinar et, dapibus sed eros. Donec ut
          velit fermentum, pulvinar magna id, fringilla neque.
          <br />
          Vestibulum vestibulum blandit vestibulum. Mauris vestibulum, dolor non
          eleifend efficitur, massa enim posuere tellus,
          <br />
          quis porttitor tortor quam ac lacus.
        </p>

        <img
          className="whattowatchlogobold"
          alt="Whattowatchlogobold"
          src={whattowatchlogobold1}
        />
      </div>
    </div>
  );
};
