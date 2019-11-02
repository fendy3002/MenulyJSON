'use strict';


Blockly.selectionArrow = function () { return Blockly.RTL ? "←" : "→"; };
Blockly.keyValueArrow = function () { return Blockly.RTL ? "⇐" : "⇒"; };


Blockly.Blocks['start'] = {
    init: function () {
        this.setColour(250);
        this.appendValueInput('json')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Eval")
            .setCheck(['s_boolean']);

        this.setDeletable(false);
    }
};

Blockly.Blocks['string'] = {
    init: function () {
        this.setColour(190);
        this.setOutput(true, ["string"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput(''), 'string_value')
            .appendField('"');
    }
};

Blockly.Blocks['number'] = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["number"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), "number_value");
    }
};

Blockly.Blocks['bool'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['true', "TRUE"],
                ['false', "FALSE"]
            ]), 'bool_value');
    }
};
Blockly.Blocks['s_boolean'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$boolean')
            .appendField(new Blockly.FieldDropdown([
                ['true', "TRUE"],
                ['false', "FALSE"]
            ]), 'bool_value');
    }
};

Blockly.Blocks['s_compare'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_boolean"]);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("$compare")
            .setCheck(['s_prop']);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldDropdown([
                ['Equal', "eq"],
                ['Not equal', "ne"],
                ['>', "gt"],
                ['>=', "gte"],
                ['<', "lt"],
                ['<=', "lte"],
                ['Start with', "starts_with"],
                ['End with', "ends_with"],
                ['Contains', "contains"],
                ['Regex', "regex"],
                ['In', "in"]
            ]), 'operation');

        this.appendValueInput('compare')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("")
            .setCheck([
                'string',
                'number',
                'boolean',
                's_boolean',
                's_prop',
                's_date',
            ]);
    }
};

Blockly.Blocks['s_prop'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_prop"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name');
    }
};
Blockly.Blocks['s_date'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_date"]);

        this.appendValueInput('date_source')
            .setCheck(['string', 's_prop'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('$date');
    }
};
let andOr = (label) => {
    return {
        length: 2,
        init: function () {
            this.setColour(20);
            this.setOutput(true, ["s_boolean"]);

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(label)
                .appendField(new Blockly.FieldTextbutton('+', function () { this.sourceBlock_.append(); }));

            this.appendValueInput('element_0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck(['s_boolean']);
            this.appendValueInput('element_1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck(['s_boolean']);
        },
        append: function () {
            let lastIndex = this.length++;

            let appended_input = this.appendValueInput('element_' + lastIndex);
            appended_input.appendField(new Blockly.FieldTextbutton('–', function () { this.sourceBlock_.delete(appended_input); }))
                .setAlign(Blockly.ALIGN_RIGHT)
            //.appendSelector(['string', 'number', 'true', 'false', 'dictionary', 'array'], Blockly.selectionArrow(), 'null');

            //this.moveInputBefore('element_' + lastIndex, 'close_bracket');
            return appended_input;
        },
        delete: function (inputToDelete) {
            let inputNameToDelete = inputToDelete.name;

            let substructure = this.getInputTargetBlock(inputNameToDelete);
            if (substructure) {
                substructure.dispose(true, true);
            }
            this.removeInput(inputNameToDelete);
            let inputIndexToDelete = parseInt(inputToDelete.name.match(/\d+/)[0]);
            let lastIndex = --this.length;

            for (let i = inputIndexToDelete + 1; i <= lastIndex; i++) { // rename all the subsequent element-inputs
                let input = this.getInput('element_' + i);
                input.name = 'element_' + (i - 1);
            }
        }
    };
};
Blockly.Blocks['s_and'] = andOr("$and");
Blockly.Blocks['s_or'] = andOr("$or");