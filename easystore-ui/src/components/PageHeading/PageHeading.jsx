import PageTitle from "../PageTitle/PageTitle";
import "./PageHeading.css";

function PageHeading({ title, children }) {
  return (
    <div className="page-heading-container">
      <PageTitle title={title} />
      {children && <p className="page-heading-desc">{children}</p>}
    </div>
  );
}

export default PageHeading;
