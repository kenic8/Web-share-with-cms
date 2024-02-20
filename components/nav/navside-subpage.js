import Link from "next/link";
export default function NavsideSubpage({ props }) {
  console.log(props)
  if (props != null) {
    return (
      <>
        <aside className="nav-subpage">
          <div className="sideNavigation-subpage">
            {/* Toplayer --> sub catagories --> subcategories  */}
            {props.map(function (name, key = 0) {
              key++;
              // let link = "/components/templates#" + name;
              let link = "/components/" + props[0] +"#" + name;
              // http://localhost:3000/components/templates#find
              return (
                <Link className="nav-link" key={key} href={link}>
                  <p>{name}</p>
                </Link>
              );
            })}
            <div className="sub-border"></div>
          </div>
        </aside>
      </>
    );
  } else {
    return;
  }
}
