/* This Source Code Form is subject to the terms of the Mozilla Public
  * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import * as React from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import EditConversionModalComponent from './EditConversionModalComponent';
import '../../styles/conversion-card-page.css';
// I realize that * is already imported from react
import { useState } from 'react';
import { ConversionData } from 'types/redux/conversions';
import translate from '../../utils/translate';

interface ConversionViewComponentProps {
	conversion: ConversionData;
	sourceIdentifier: string;
	destinationIdentifier: string;
}

export default function ConversionViewComponent(props: ConversionViewComponentProps) {
	// Don't check if admin since only an admin is allow to route to this page.

	// Edit Modal Show
	const [showEditModal, setShowEditModal] = useState(false);

	const handleShow = () => {
		setShowEditModal(true);
	}

	const handleClose = () => {
		setShowEditModal(false);
	}

	// TODO: Get unit identifier values instead of DB IDs for sourceId and destinationId.
	const header = (props.sourceIdentifier + ' -> ' + props.destinationIdentifier);

	return (
		<div className="card">
			<div className="header-container">
				{header}
			</div>
			<div className="conversion-container">
				<b><FormattedMessage id="conversion.sourceId" /></b> {props.conversion.sourceId}
			</div>
			<div className="conversion-container">
				<b><FormattedMessage id="conversion.destinationId" /></b> {props.conversion.destinationId}
			</div>
			<div className="conversion-container">
				<b><FormattedMessage id="conversion.bidirectional" /></b> {props.conversion.bidirectional}
			</div>
			<div className="conversion-container">
				<b><FormattedMessage id="conversion.slope" /></b> {props.conversion.slope}
			</div>
			<div className="conversion-container">
				<b><FormattedMessage id="conversion.intercept" /></b> {props.conversion.intercept}
			</div>
			<div className="conversion-container">
				{/* Only show first 30 characters so card does not get too big. Should limit to one line */}
				<b><FormattedMessage id="conversion.note" /></b> {props.conversion.note.slice(0, 29)}
			</div>
			<div className="edit-btn">
				<Button variant="Secondary" onClick={handleShow}>
					<FormattedMessage id="edit.conversion" />
				</Button>
				{/* Creates a child ConversionModalEditComponent */}
				<EditConversionModalComponent show={showEditModal} conversion={props.conversion} handleClose={handleClose} />
			</div>
		</div>
	);
}