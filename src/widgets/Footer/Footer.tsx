import FooterNav from "../../features/FooterNav/FooterNav";
import PaySystems from "../../entities/PaySystems/PaySystems";
import Copyright from "../../entities/Copyright/Copyright";
import FooterContacts from "../../entities/FooterContacts/FooterContacts";

export default function Footer () {

  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <FooterNav />
        </div>
        <div className="col">
          <PaySystems />
          <Copyright />
        </div>
        <div className="col text-right">
          <FooterContacts />
        </div>
      </div>
    </footer>
  );
}