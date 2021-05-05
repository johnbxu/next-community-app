import {
    CHANGE_FAILURE,
    CHANGE_TREE,
    PUSH,
    SPLICE,
} from '../actions/tree';


const treeReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_FAILURE: {
            //Could do more here
            return state;
        
        }
        case CHANGE_TREE: {
            const { change, tree, quantity } = action;
            return {
                ...state,
                treeName: change.target.value,
                tree: tree,
                quantity: quantity,
            };
        }
        case PUSH: {
            const { tree, quantity } = state;
            const { node } = action;
            tree.push(node);
            return {
                ...state,
                quantity: quantity - 1,
            };
        }
        case SPLICE: {
            const { tree, quantity } = state;
            const { node } = action;
            tree.splice(tree.indexOf(node), 1);
            return {
                ...state,
                quantity: quantity + 1,
            };
        }
        default:
            return state;
    }
}

export default treeReducer;