import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './Demo.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {fetchAllObjectives, registerObjectives, setObjective} from "../../store/modules/objectives/actions";
import 'sweetalert2/src/sweetalert2.scss'

class Demo1 extends Component {
    openModals = () => {
        // let modal = document.querySelector(".modal")
        // let modalBtn = document.getElementById("modal-btn");
        // modalBtn.onclick = function(){
        //     modal.style.display = "block"
        // }
        // window.onclick = function(e){
        //     if(e.target == modal){
        //         modal.style.display = "none"
        //     }
        // }
        // Swal.fire({
        //     title: 'Error!',
        //     text: 'Do you want to continue',
        //     icon: 'error',
        //     confirmButtonText: 'Cool'
        // })
        this.successTimer();
    }
    closeModal = () => {
        let modal = document.querySelector(".modal")
        let closeBtn = document.querySelector(".close-btn")

        closeBtn.onclick = function(){
            modal.style.display = "none"
        }
        window.onclick = function(e){
            if(e.target == modal){
                modal.style.display = "none"
            }
        }
    }

   timers = () => {
       let timerInterval
       Swal.fire({
           title: 'Success!',
           html: 'Change Successful',
           timer: 5000,
           timerProgressBar: true,
           willOpen: () => {
               Swal.showLoading()
               timerInterval = setInterval(() => {
                   const content = Swal.getContent()
                   if (content) {
                       const b = content.querySelector('b')
                       if (b) {
                           b.textContent = Swal.getTimerLeft()
                       }
                   }
               }, 100)
           },
           onClose: () => {
               clearInterval(timerInterval)
           }
       }).then((result) => {
           /* Read more about handling dismissals below */
           if (result.dismiss === Swal.DismissReason.timer) {
               console.log('I was closed by the timer')
           }
       })

   }

   successTimer = () => {
       const Toast = Swal.mixin({
           toast: true,
           position: 'top-end',
           showConfirmButton: false,
           timer: 3000,
           timerProgressBar: true,
           didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
       })

       Toast.fire({
           icon: 'success',
           title: 'I Got you!'
       })
       this.props.fetchAllObjectives();
   }

    render() {
        return (
            <div>
                <button
                    id="modal-btn"
                    onClick={this.openModals}
                >
                    click me, I make a modal
                </button>
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close-btn"
                            onClick={this.closeModal}
                        >&times;</span>
                        <p>this is the text inside the modal</p>
                    </div>
                </div>

                {/*<div className="modal">*/}
                {/*    <div className="modal-header">*/}
                {/*        <span className="close-btn">&times;</span>*/}
                {/*        <h1>I am the Header</h1>*/}
                {/*    </div>*/}
                {/*    <div className="modal-content">*/}
                {/*        <p>this is the text inside the modal</p>*/}
                {/*    </div>*/}
                {/*    <div className="modal-footer">*/}
                {/*        <h2>I am the Footer</h2>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

Demo1.propTypes = {

    fetchAllObjectives: PropTypes.func.isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,


};


const mapStateToProps = state => ({

    registeredObjectives: state.objectives.registeredObjectives,


});



const mapDispatchToProps = dispatch => ({

    fetchAllObjectives: () => dispatch(fetchAllObjectives()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo1);
