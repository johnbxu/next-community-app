import React, { useReducer } from 'react';
import { 
    CHANGE_FAILURE,
    CHANGE_TREE,
    PUSH,
    SPLICE,
} from '../actions/tree';
import treeReducer from '../reducers/tree';
import { checkBranches } from '../utils';

const useTree = ( startingConfig ) => {

    const [{
        tree,
        quantity,
        treeName,
        treeNodes,
    }, dispatch] = useReducer(treeReducer, {
        tree: startingConfig.tree,
        quantity: startingConfig.quantity,
        treeName: startingConfig.treeName,
        treeNodes: startingConfig.treeNodes,
    });

    const toggleNode = (toggledNode) =>{
        //variables needed for the testing
        let changeSuccess = true;
        let checkedNodes = [1];
        let testTree = tree.slice();
        //checks which way the toggle was done and updates the 'testTree' before testing for validity
        if(!tree.includes(toggledNode)) {
            testTree.push(toggledNode);
            if (quantity === 0) {
                changeSuccess = false;
            }
        }
        else {
            testTree.splice(testTree.indexOf(toggledNode), 1);
        }
        //Same test as before - refactored
        if (!changeSuccess) {
            //Code associated with not enough skill points
            alert('Not enough skill points!');
        }
        else if (testTree.length > 1) {
            //conducts a test for each node - whether its branch is connected to the start of the network (ie. no breaks in network)
            testTree.forEach((node) => {
                if(!checkedNodes.includes(node)) {
                    //checkBranches pulled in from utils
                    let nodeTest = checkBranches(testTree, node, treeNodes[treeName], checkedNodes, startingConfig.relatedNodeIdString);
                    nodeTest.checkedNodes.forEach((node) => {
                        checkedNodes.includes(node) ? '' : checkedNodes.push(node);
                    });
                    //if any single test branch is not valid, the entire change should fail
                    if(!nodeTest.isValid){
                        changeSuccess = false;
                    }
                }
            });
        }
        if (!changeSuccess) {
            dispatch({
                type: CHANGE_FAILURE,
            });
        }
        //if the change was valid, pushes the necessary changes to state
        else if(!tree.includes(toggledNode)) {
            dispatch({
                type: PUSH,
                node: toggledNode,
            });
        }
        else {
            dispatch({
                type: SPLICE,
                node: toggledNode,
            });
        }
    };
    //updates the tree based on a tree choice change
    const changeTree = (change) => {
        if (treeName !== change.target.value) {
            dispatch({
                type: CHANGE_TREE,
                change: change,
                //can also reset points and values which is probably desirable unless points for different classes are tracked separately
                tree: startingConfig.defaultTree,
                quantity: startingConfig.defaultQuantity,
            });
        }
    };
    //return values
    const propsLocal = {
        tree: tree,
        quantity: quantity,
        treeName: treeName,
        treeNodes: treeNodes,
        toggleNode: toggleNode,
        changeTree: changeTree,
    };
    return propsLocal;
};

export default useTree;