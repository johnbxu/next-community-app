export const checkBranches = (selectedNodes, firstTestNode, nodeTree, previouslyCheckedNodes, relatedNodeIdString) => {
    let checkedNodes = previouslyCheckedNodes.slice();
    let currentTestNodes = [firstTestNode];
    let futureTestNodes = [];
    let connectedToStart = false;
  
    const checkConnectedNodes = (testNode, currentStatus) => {
      //Gets a list of nodes that are connected to this node and are also active (part of selectedNodes)
      let activeConnectedNodes = (nodeTree.filter(
        (tree) => tree.node_id === testNode
      )[0][relatedNodeIdString]).filter(
        (node) => selectedNodes.includes(node)
      );
      /*previouslyCheckedNodes is assumed to contain the starting node 
      (and nodes from other branches that either succeeded or failed in previous calls to checkBranches)*/
      if(activeConnectedNodes.some((node)  => previouslyCheckedNodes.includes(node))) {
        return true;
      }
      //set up array of possible nodes to check if branch is still not connected to previouslyCheckedNodes
      else {
        activeConnectedNodes.forEach((node) => {
          futureTestNodes.includes(node) ? '' : futureTestNodes.push(node);
        });
        //this is needed because an earlier test node being looped through could have returned 'true' and that value needs to be preserved
        return currentStatus;
      }
    }
    
    //Conduct checks as needed - exit conditions: connectedToStart means success; currentTestNodes.length === 0 means failure
    while(!connectedToStart && currentTestNodes.length !== 0) {
      //resets futureTestNodes at the start of each loop
      futureTestNodes = [];
      //conducts test and adds each unchecked node to the array of checkedNodes
      currentTestNodes.forEach(node => {
        checkedNodes.push(node);
        connectedToStart = checkConnectedNodes(node, connectedToStart)
      });
      //pulls currentTestNodes from the futureTestNodes from the completed test iteration (excludes previously tested nodes to minimize retesting)
      currentTestNodes = futureTestNodes.slice().filter(
        (node) => !checkedNodes.includes(node)
      );
    }
    
    /*returns an object that includes:
    boolean value isValid that confirms whether the firstTestNode is on a branch that is connected to the start,
    the array of nodes that have been confirmed to be part of this branch and previously tested branches */
    let returnValues = {
      isValid: connectedToStart,
      checkedNodes: checkedNodes,
    }
  
    return returnValues;
  }