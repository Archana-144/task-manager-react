import "../App.css";

function Footer() {

  return (

    <footer className="footer">

      <h3>

        TaskFlow

      </h3>

      <p>

        © {new Date().getFullYear()}

        {" "}

        All Rights Reserved

      </p>

    </footer>

  );

}

export default Footer;