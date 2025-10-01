import React from "react";
import "./footer.css"
import FooterData from "../../data/FooterData";

export default function Footer({ data = FooterData }) {
    const year = new Date().getFullYear();

    return(
         <footer className="site-footer" id="contacto" aria-labelledby="footer-heading">
            <div className="container footer-inner">
                <div className="footer-col footer-brand">
                    <img className="brand-logo" src={data.brand.logo} alt={data.brand.logoAlt} />
                     <h4 id="footer-heading">{data.brand.showroomTitle}</h4>

                    <p> 
                        <strong>{data.location.headline}</strong>
                    </p>

                    <p dangerouslySetInnerHTML={{ __html: data.location.addressHtml }} />
                    <p dangerouslySetInnerHTML={{ __html: data.location.hoursHtml }} />
                </div>
                 <div className="footer-col">
                    <h4>Contacto Digital</h4>
                    <ul className="footer-list">
                        {data.digital.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.label}:</strong>{" "}
                            <a
                            href={item.href}
                            {...(item.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            >
                            {item.text}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
             </div>

              <div className="footer-copy">
                <div className="container">
                    © {year} {data.brand.name}. Todos los derechos reservados. {data.legalSuffix}
                </div>
            </div>
        </footer>
    );            
}


