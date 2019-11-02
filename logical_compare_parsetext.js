'use strict';

Blockly.logical_compare.parseText = function (json_text, workspace) {
    let json_structure;
    try {
        json_structure = JSON.parse(json_text);
    } catch (ex) {
        alert("JSON not correct");
        return;
    }
    workspace.clear();

    let startBlock = workspace.newBlock('start');
    startBlock.initSvg();
    buildAndConnect(json_structure, startBlock.getInput('json').connection, workspace);
    workspace.render();
};

let buildAndConnect = function (json_structure, parentConnection, workspace) {
    if (json_structure === null) {
        return;
    } else {
        let type = typeof (json_structure);
        if (type == 'boolean') {
            let block = workspace.newBlock('boolean', true);
            block.initSvg();

            block.setFieldValue(json_structure ? "TRUE" : "FALSE", 'bool_value');
            let blockOutput = block.outputConnection;
            blockOutput.connect(parentConnection);
        }
        else if (type == 'number') {
            let block = workspace.newBlock('number', true);
            block.initSvg();

            block.setFieldValue(json_structure, "number_value");
            let blockOutput = block.outputConnection;
            blockOutput.connect(parentConnection);
        }
        else if (type == 'string') {
            let block = workspace.newBlock('string', true);
            block.initSvg();

            block.setFieldValue(json_structure, "string_value");
            let blockOutput = block.outputConnection;
            blockOutput.connect(parentConnection);
        }
        else if (type == "object") {
            if (json_structure.hasOwnProperty("$and")) {
                handle_s_andOr("$and", json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$or")) {
                handle_s_andOr("$or", json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$compare")) {
                handle_s_compare(json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$boolean")) {
                handle_s_boolean(json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$prop")) {
                handle_s_prop(json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$date")) {
                handle_s_date(json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$between")) {
                handle_s_between("$between", json_structure, parentConnection, workspace);
            }
            else if (json_structure.hasOwnProperty("$betweenEx")) {
                handle_s_between("$betweenEx", json_structure, parentConnection, workspace);
            }
        }
    }
};

let handle_s_boolean = (json_structure, parentConnection, workspace) => {
    let block = workspace.newBlock('s_boolean', true);
    block.setFieldValue(json_structure.$boolean ? "TRUE" : "FALSE", 'bool_value');
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);
};
let handle_s_andOr = (propName, json_structure, parentConnection, workspace) => {
    let blockName = propName == "$and" ? "s_and" : "s_or";
    let block = workspace.newBlock(blockName, true);
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);

    let propVal = json_structure[propName];
    for (let i = 0; i < propVal.length; i++) {
        if(i > 1){
            block.add.bind(block)();
        }
        let input = block.getInput('element_' + i);
        buildAndConnect(propVal[i], input.connection, workspace);
    }
};
let handle_s_compare = (json_structure, parentConnection, workspace) => {
    let block = workspace.newBlock('s_compare', true);
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);

    let propVal = json_structure.$compare;
    buildAndConnect(propVal[0], block.getInput("source").connection, workspace);
    block.setFieldValue(propVal[1], "operation")
    buildAndConnect(propVal[2], block.getInput("compare").connection, workspace);
};
let handle_s_prop = (json_structure, parentConnection, workspace) => {
    let block = workspace.newBlock('s_prop', true);
    block.setFieldValue(json_structure.$prop, 'prop_name');
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);
};
let handle_s_date = (json_structure, parentConnection, workspace) => {
    let block = workspace.newBlock("s_date", true);
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);

    let propVal = json_structure.$date;
    buildAndConnect(propVal, block.getInput("date_source").connection, workspace);
};
let handle_s_between = (propName, json_structure, parentConnection, workspace) => {
    let blockName = propName == "$between" ? "s_between" : "s_between_ex";
    let block = workspace.newBlock(blockName, true);
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);

    let propVal = json_structure[propName];
    let min = propVal[0];
    buildAndConnect(min, block.getInput("min").connection, workspace);
    let source = propVal[1];
    buildAndConnect(source, block.getInput("source").connection, workspace);
    let max = propVal[2];
    buildAndConnect(max, block.getInput("max").connection, workspace);
};