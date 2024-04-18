import Brand from "../../entities/Brand/Brand";
import HeaderNavbar from "../../features/HeaderNavbar/HeaderNavbar";
import Icons from "../../features/Icons/Icons";

export default function Header() {


  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Brand />
            <div className="collapse navbar-collapse" id="navbarMain">
              <HeaderNavbar />
              <div>
                <Icons />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}