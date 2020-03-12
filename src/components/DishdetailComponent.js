import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle
		, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader,
		ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm} from 'react-redux-form'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		alert("Current State is: "+JSON.stringify(values));
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
				<Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Col>
	                            <Label htmlFor="rating">Rating</Label>
	                            <Control.select model=".rating" id="rating" className="form-control">
	                                <option>1</option>
	                                <option>2</option>
	                                <option>3</option>
	                                <option>4</option>
	                                <option>5</option>
	                            </Control.select>
	                            </Col>
							</Row>
							<Row className="form-group">
								<Col>
								<Label htmlFor="yourname">Your Name</Label>
								<Control.text model=".yourname" id="yourname" className="form-control"
									name = "yourname"
									placeholder="Your Name"
									validators={{
										maxLength: maxLength(15), minLength: minLength(3)
									}} />

								<Errors
	                            	className="text-danger"
	                            	model=".yourname"
	                            	show="touched"
	                            	messages= {{
	                            		minLength: 'Must be greater than 2 characters',
	                            		maxLength: 'Must be 15 characters or less'
	                            	}}
	                            />
	                            </Col>
							</Row>
							<Row className="form-group">
								<Col>
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" id="comment" name="comment"
									rows="6" className="form-control" />
								</Col>
							</Row>
							<Row className="form-group">
								<Col>
								<Button color="primary" type="submit">
								Submit
								</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

function RenderComments({comments}) {
		if (comments!=null) {
			return (
				<div>
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{comments.map((comment) => {
							return (
								<li key={comment.id}>
								<p>{comment.comment}</p>
								<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
								                            year: 'numeric',
								                            month: 'long',
								                            day: '2-digit'
								                        }).format(new Date(comment.date))}</p>
								</li>
							);
						})}
					</ul>
					<CommentForm />
				</div>
			)
		} else {
			return (<div></div>)
		}
}

function RenderDish({dish}) {
		if (dish!=null) {
			return (
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name}/>
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
			)
		}
		else {
			return (<div></div>)
		}
}

const DishDetail = (props) => {
		const dish=props.dish;
		if (dish==null) {
			return (<div></div>)
		}
		return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
}


export default DishDetail;