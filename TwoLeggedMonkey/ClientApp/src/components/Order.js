import React, { Component } from 'react';
import orderRequests from '../DBRequests/orderRequest';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

const plainOrder =
{
  customerId: 0,
  isComplete: true,
  isActive: false,
}

export class Order extends Component {

  state =
  {
    orders: [],
    show: false,
    newOrder: plainOrder,
  }

  componentDidMount ()
  {
    orderRequests
    .getAllOrdersRequest()
    .then((orders) =>
    {
      orders.forEach(order =>
        {
          order.edit = "";
        })
      this.setState({orders});
    })
    .catch((err) =>
    {
      console.error(err)
    });
  }

  deleteOrderClick = (e) =>
  {
    const orderId = e.target.id;
    orderRequests
    .deleteOrder(orderId)
    .then(() =>
    {
      this.componentDidMount();
    })
    .catch((err) =>
    {
      console.error(err);
    });
  };

  editOrder = (index) =>
  {
    const tempOrder = {...this.state.orders};
    tempOrder[index].edit = index;
    this.setState({orders: tempOrder});
  }

  updateOrder = (e) =>
  {
    e.preventDefault();
    orderRequests.updateOrder(e.target.id, this.state.newOrder);
    this.componentDidMount();
  };

  postOrder = (e) =>
  {
    e.preventDefault();
    orderRequests.postNewOrder(this.state.newOrder);
    this.handleClose();
    this.componentDidMount();
  }

  orderState = (name, e) =>
  {
    const tempOrder = {...this.state.newOrder};
    tempOrder[name] = e.target.value;
    this.setState({newOrder : tempOrder});
  }

  orderBoolState = (name, e) =>
  {
    const tempOrder = {...this.state.newOrder};
    tempOrder[name] = (e.target.value === "true");
    this.setState({newOrder : tempOrder});
  }

  customerIdCreate = (e) =>
  {
    this.orderState("customerId", e);
  }

  isCompleteCreate = (e) =>
  {
    this.orderBoolState("isComplete", e);
  }

  isActiveCreate = (e) =>
  {
    this.orderBoolState("isActive", e);
  }

  constructor (props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.setState({ show: false });
  }

  handleShow () {
    this.setState({ show: true });
  }

  render() {
    const myOrders = this.state.orders.map((order, index) =>
  {
    if(order.edit === "")
    {
      return (
        <tr key = {order.id}>
          <td className={order.edit}>{order.id}</td>
          <td>{order.customerId}</td>
          {order.isComplete === true ? <td>Complete</td> : <td>Not Complete</td>}
          {order.isActive === true ? <td>Active</td> : <td>Not Active</td>}
          <td><button className="btn btn-danger" onClick={this.deleteOrderClick} id={order.id}><Glyphicon glyph="trash" /></button></td>
          <td><button className="btn btn-default" onClick={() => {this.editOrder(index); }} id={order.id}><Glyphicon glyph="pencil" /></button></td>
        </tr>
      );
    }
    else
    {
      return (
        <tr key = {order.id}>
          <td>{order.id}</td>
          <td>{order.customerId}</td>
          {order.isComplete === true ? <td><input onChange={this.isCompleteCreate} placeholder="Complete"/></td> : <td><input onChange={this.isCompleteCreate} placeholder="Not Complete"/></td>}
          {order.isActive === true ? <td><input onChange={this.isActiveCreate} placeholder="Active"/></td> : <td><input onChange={this.isActiveCreate} placeholder="Not Active"/></td>}
          <td><button className="btn btn-danger" onClick={this.deleteOrderClick} id={order.id}><Glyphicon glyph="trash" /></button></td>
          <td><button className="btn btn-default" onClick={this.updateOrder} id={order.id}><Glyphicon glyph="floppy-save" /></button></td>
        </tr>
      );
    }

  });
  return (
    <div>
      <h1>Orders</h1>
      <button onClick={this.handleShow}>Post</button>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Customer Id</th>
              <th>Completion Status</th>
              <th>Active Status</th>
            </tr>
            {myOrders}
          </tbody>
        </table>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>New Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input placeholder="Customer Id" onChange={this.customerIdCreate}/>
            <input placeholder="Completeion Status" onChange={this.isCompleteCreate}/>
            <input placeholder="Active Status" onChange={this.isActiveCreate}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.postOrder}>Save changes</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
}
