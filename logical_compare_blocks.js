'use strict';


Blockly.selectionArrow = function () { return Blockly.RTL ? "←" : "→"; };
Blockly.keyValueArrow = function () { return Blockly.RTL ? "⇐" : "⇒"; };


Blockly.Blocks['start'] = {
    init: function () {
        this.setColour(290);
        this.appendValueInput('json')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Eval")
            .setCheck(['s_boolean']);

        this.setDeletable(false);
    }
};

Blockly.Blocks['string'] = {
    init: function () {
        this.setColour(20);
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
        this.setColour(20);
        this.setOutput(true, ["number"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), "number_value");
    }
};

Blockly.Blocks['boolean'] = {
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

Blockly.Blocks['s_compare'] = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["s_boolean"]);
        this.setInputsInline(false);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("$compare")
            .setCheck(['s_prop', 's_date']);

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
let andOr = (label) => {
    return {
        length: 2,
        init: function () {
            this.setColour(210);
            this.setOutput(true, ["s_boolean"]);

            this.setInputsInline(false);
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(label)
                .appendField(new Blockly.FieldDropdown([
                    ["-----", ""],
                    ["Add", "ADD"],
                    ["Delete last", "DELETE"]
                ], this.checkAction.bind(this)), "ACTION");

            this.appendValueInput('element_0')
                .setCheck(['s_boolean']);
            this.appendValueInput('element_1')
                .setCheck(['s_boolean']);
        },
        checkAction: function (newValue) {
            if (newValue === "ADD") {
                this.add();
            }
            else if (newValue === "DELETE") {
                let lastIndex = this.length - 1;
                let inputName = 'element_' + lastIndex;
                this.delete(inputName);
            }

            return "";
        },
        add: function() {
            let lastIndex = this.length++;
            let inputName = 'element_' + lastIndex;
            this.appendValueInput(inputName)
                .setCheck(['s_boolean'])
                .setAlign(Blockly.ALIGN_RIGHT);
        },
        delete: function (inputNameToDelete) {
            let substructure = this.getInputTargetBlock(inputNameToDelete);
            if (substructure) {
                substructure.dispose(true, true);
            }
            this.removeInput(inputNameToDelete);
            let inputIndexToDelete = parseInt(inputNameToDelete.match(/\d+/)[0]);
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

let between = (label) => {
    return {
        init: function () {
            this.setColour(210);
            this.setOutput(true, ["s_boolean"]);

            let checkWhitelist = [
                'string',
                'number',
                's_prop',
                's_date',
            ];
            this.appendValueInput('min')
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(label)
                .setCheck(checkWhitelist);
            this.appendValueInput('source')
                .setAlign(Blockly.ALIGN_CENTRE)
                .setCheck(['s_prop', 's_date']);

            this.appendValueInput('max')
                .setAlign(Blockly.ALIGN_CENTRE)
                .setCheck(checkWhitelist);
        }
    };
};
Blockly.Blocks['s_between'] = between("$between");
Blockly.Blocks['s_between_ex'] = between("$betweenEx");