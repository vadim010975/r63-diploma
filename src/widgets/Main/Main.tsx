import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({children}) => {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="./src/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export default Main;