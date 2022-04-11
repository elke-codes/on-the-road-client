/// --- MODAL --- ///
//www.linkedin.com/learning/react-design-patterns/modal-components?autoAdvance=true&autoSkip=false&autoplay=true&resume=false

import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
`;
const ModalBody = styled.div`
	background-color: white;
	margin: 10% auto;
	padding: 20px;
	width: fit-content;
`;

const Modal = ({ children, setShowModal, howModal }) => {
	console.log("in modal");
	return (
		<>
			{/* {showModal && ( */}
			<ModalBackground onClick={() => setShowModal(false)}>
				{/* prevent the modal from closing when clicking on the modal body */}
				<ModalBody onClick={(e) => e.stopPropagation()}>
					<button onClick={() => setShowModal(false)}>X</button>
					{children}
				</ModalBody>
			</ModalBackground>
			{/* )} */}
		</>
	);
};

export default Modal;
