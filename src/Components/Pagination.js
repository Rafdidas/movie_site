const Paginations = (props) => {
    const Previous = () => {
        if (props.page !== 1) {
            props.setPage(props.page - 1);
        } else {
            props.setPage(props.page);
        }
    }
    const Next = () => {
        if (props.page < 10) {
            props.setPage(props.page + 1);
        }
    }
    return(
        <div className="pagination">
            <p className="page_btn prev_btn" onClick={Previous}>PREV</p>
            <p className="page_btn next_btn" onClick={Next}>NEXT</p>
        </div>
    )
};

export default Paginations;