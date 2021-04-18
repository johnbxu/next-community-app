const treeReducer = (state, action) => {
    switch (action.type) {
        case 'SPLICE': {
            const { tree } = state;
            const { node } = action;
            const nodeIndex = tree.map((rec) => rec.id).indexOf(node.id);
            return {
                ...state,
                tree: [
                    ...tree.slice(0, nodeIndex),
                    ...tree.slice(nodeIndex + 1)
                ],
            };
        }
        case 'PUSH': {
            const { tree } = state;
            const { node } = action;
            return {
                ...state,
                tree: [
                    ...tree.slice(),
                    node,
                ],
            };
        }
        default:
            return state;
    }
}

export default treeReducer;