
const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    margin: '8px',
    border: '1px solid #ddd',
};

function GenericForm({children} : {children: React.ReactNode}) {
    return (
        <div style={formStyle}>
            {children}
        </div>
    );
}

export default GenericForm;