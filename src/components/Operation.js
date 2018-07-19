import React,{Component} from 'react'

class Operation extends Component{

    render() {
        return (
            <div className="operationScreen">
                {this.props.operation}
            </div>
        );
    }

}
export default Operation