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

            block.setFieldValue('bool_value', json_structure ? "TRUE" : "FALSE");
            let blockOutput = block.outputConnection;
            blockOutput.connect(parentConnection);
        }
        else if (type == "object") {
            if (json_structure.hasOwnProperty("$and")) {
                let block = workspace.newBlock('s_and', true);
                block.initSvg();
                let blockOutput = block.outputConnection;
                blockOutput.connect(parentConnection);
            }
            if (json_structure.hasOwnProperty("$boolean")) {
                handle_s_boolean(json_structure, parentConnection, workspace);
            }
        }
        //     type = String(Boolean(json_structure));
        // } else if (type == 'object') {
        //     type = (json_structure instanceof Array) ? 'array' : 'dictionary';
        // }

        // var targetBlock = Blockly.Block.obtain(parentConnection.sourceBlock_.workspace, type);
        // targetBlock.initSvg();
        // targetBlock.render();

        // var childConnection = targetBlock.outputConnection;
        // parentConnection.connect(childConnection);

        // switch (type) {
        //     case 'string':
        //         targetBlock.setFieldValue(String(json_structure), 'string_value');
        //         break;
        //     case 'number':
        //         targetBlock.setFieldValue(String(json_structure), 'number_value');
        //         break;
        //     case 'dictionary':
        //         var i = 0;
        //         for (var key in json_structure) {
        //             targetBlock.appendKeyValuePairInput();
        //             targetBlock.setFieldValue(key, 'key_field_' + i);

        //             var elementConnection = targetBlock.getInput('element_' + i).connection;
        //             Blockly.JSON.buildAndConnect(json_structure[key], elementConnection);

        //             i++;
        //         }
        //         break;
        //     case 'array':
        //         for (var i in json_structure) {
        //             targetBlock.appendArrayElementInput();

        //             var elementConnection = targetBlock.getInput('element_' + i).connection;
        //             Blockly.JSON.buildAndConnect(json_structure[i], elementConnection);
        //         }
        //         break;
        // }
    }
};

let handle_s_boolean = (json_structure, parentConnection, workspace) => {
    let block = workspace.newBlock('s_boolean', true);
    block.setFieldValue(json_structure.$boolean ? "TRUE" : "FALSE", 'bool_value');
    block.initSvg();
    let blockOutput = block.outputConnection;
    blockOutput.connect(parentConnection);
}