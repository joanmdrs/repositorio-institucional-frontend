import logoFcst from "../../assets/fcst.png"

const headerStyle: React.CSSProperties = {
    backgroundColor: "#F5F5F5",
    height: 70,
    lineHeight: '64px',
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "20px",
    borderTop: "10px solid #1677FF",
    color: "#A4A4A4"
};

const logoStyle: React.CSSProperties = { 
    width: 100,
}

const dividerStyle: React.CSSProperties = {
    width: "2px",
    height: 40,
    backgroundColor: "#ddd"
}

function HeaderLogin () {
    return (
            <header style={headerStyle}>
                <img src={logoFcst} style={logoStyle}  alt="Logo da Faculdade Caicoense Santa Teresinha"/>
                <div style={dividerStyle} />
                <h5> 
                    FACULDADE CAICOENSE SANTA TERESINHA 
                </h5>
            </header>
        
    )
}

export default HeaderLogin