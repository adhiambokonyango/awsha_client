import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './Report.css';

class Report extends Component {
    state = {
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    }

    handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

    createAndDownloadPdf = () => {
        axios.post('/create-pdf', this.state)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'Reportlication/pdf' });

                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }

    render() {
        return (
            <div className="Report">
                <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
                <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
                <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
                <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
                <button onClick={this.createAndDownloadPdf}>Download PDF</button>
            </div>
        );
    }
}

export default Report;