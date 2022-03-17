
module.exports.createLargeArray = (req, res) => {
    console.log("testing load with array creation on : " + process.pid)
    populateHugeList();
    res.json({ ProcessId: 'Worker Process Id ' + process.pid });
}

const populateHugeList = () => {
    let lst = new Array(1e6);
    for (let k = 0; k < lst.length; k++) {
        lst[k] = k * 5;
    }
    // after populating elements
    // fire a message informing master that list is created only in cluster mode
    // process.send('List is created on worker process id ' + process.pid);
};