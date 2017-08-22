
const Augmented = require("augmentedjs");
Augmented.Presentation = require("augmentedjs-presentation");

/**
* A private logger for use in the framework only
* @private
*/
const _logger = Augmented.Logger.LoggerFactory.getLogger(
      Augmented.Logger.Type.console, Augmented.Configuration.LoggerLevel);

const defaultTableCompile = function(name, desc, columns, data, lineNumbers, sortKey, editable, display) {
  var html = "<table " + tableDataAttributes.name + "=\"" + name + "\" " + tableDataAttributes.description + "=\"" + desc + "\">";
  if (name) {
    html = html + "<caption";
    if (desc) {
      html = html + " title=\"" + desc + "\"";
    }
    html = html + ">" + name + "</caption>";
  }
  html = html + "<thead>";
  html = html + defaultTableHeader(columns, lineNumbers, sortKey, display);
  html = html + "</thead><tbody>";
  if (data) {
    if (editable) {
      html = html + editableTableBody(data, columns, lineNumbers, sortKey, display);
    } else {
      html = html + defaultTableBody(data, columns, lineNumbers, sortKey, display);
    }
  }
  html = html + "</tbody></table>";
  return html;
};

const defaultTableHeader = function(columns, lineNumbers, sortKey, display) {
  var html = "";
  if (columns) {
    html = html + "<tr>";
    if (lineNumbers) {
      html = html + "<th " + tableDataAttributes.name + "=\"lineNumber\">#</th>";
    }
    var key, obj;
    for (key in columns) {
      if (columns.hasOwnProperty(key)) {
        obj = columns[key];
        html = html + "<th " + tableDataAttributes.name + "=\"" + key + "\" " + tableDataAttributes.description + "=\"" + obj.description + "\" " + tableDataAttributes.type + "=\"" + obj.type + "\"";
        if (sortKey === key) {
          html = html + " class=\"" + tableDataAttributes.sortClass + "\"";
        }
        html = html + ">" + key + "</th>";
      }
    }
    html = html + "</tr>";
  }
  return html;
};

const defaultTableBody = function(data, columns, lineNumbers, sortKey, display) {
  var i, d, dkey, dobj, html = "", l = data.length, t;
  for (i = 0; i < l; i++) {
    d = data[i];
    html = html + "<tr>";
    if (lineNumbers) {
      html = html + "<td class=\"label number\">" + (i+1) + "</td>";
    }
    for (dkey in d) {
      if (d.hasOwnProperty(dkey)) {
        dobj = d[dkey];
        t = (typeof dobj);
        html = html + "<td " + tableDataAttributes.type + "=\"" + t + "\" class=\"" + t;
        if (sortKey === dkey) {
          html = html + " " + tableDataAttributes.sortClass;
        }
        html = html + "\">" + dobj + "</td>";
      }
    }
    html = html + "</tr>";
  }
  return html;
};

const editableTableBody = function(data, columns, lineNumbers, sortKey, display) {
  var i, d, dkey, dobj, html = "", l = data.length, t;
  for (i = 0; i < l; i++) {
    d = data[i];
    html = html + "<tr>";
    if (lineNumbers) {
      html = html + "<td class=\"label number\">" + (i+1) + "</td>";
    }
    for (dkey in d) {
      if (d.hasOwnProperty(dkey)) {
        dobj = d[dkey];
        t = (typeof dobj);
        html = html + "<td " + tableDataAttributes.type + "=\"" + t + "\" class=\"" + t;
        if (sortKey === dkey) {
          html = html + " " + tableDataAttributes.sortClass;
        }
        html = html + "\">";
        var myType = "text";
        if (t === "boolean") {
          myType = "checkbox";
        } else if (t === "number") {
          myType = "number";
        } else if (t === "array") {
          myType = "radio";
        }

        html = html + "<input type=\"" + myType + "\" " +
        (dobj === true ? "checked=\"checked\"" : "") +
        " value=\"" + dobj + "\"" +
        tableDataAttributes.name + "=\"" + dkey + "\" " +
        tableDataAttributes.index + "=\"" + i + "\"/></td>";
      }
    }
    html = html + "</tr>";
  }
  return html;
};

/*
* << First | < Previous | # | Next > | Last >>
*/

const defaultPaginationControl = function(currentPage, totalPages) {
  return "<div class=\"paginationControl\">" +
  "<span class=\"first\"><< First</span>" +
  "<span class=\"previous\">< Previous</span>" +
  "<span class=\"current\">" + currentPage + " of " + totalPages + "</span>" +
  "<span class=\"next\">Next ></span>" +
  "<span class=\"last\">Last >></span></div>";
};

module.exports.LegacyTable = Augmented.Presentation.AutomaticTable.extend({

  compileTemplate: function() {
    var h = defaultTableCompile(this.name, this.description, this._columns, this.collection.toJSON(), this.lineNumbers, this.sortKey, this.editable, this.display);
    if (this.renderPaginationControl) {
      h = h + defaultPaginationControl(this.currentPage(), this.totalPages());
    }
    return h;
  },

  render: function() {
    var e;
    if (this.template) {
      // refresh the table body only
      this.showProgressBar(true);
      if (this.el) {
        e = (typeof this.el === 'string') ? document.querySelector(this.el) : this.el;
        var tbody = e.querySelector("tbody"), thead = e.querySelector("thead"), h;
        if (e) {
          if (this._columns && (Object.keys(this._columns).length > 0)){
            if (this.sortable) {
              this.unbindSortableColumnEvents();
            }
            h = defaultTableHeader(this._columns, this.lineNumbers, this.sortKey, this.display, this.selectable);
          } else {
            h = "";
          }
          thead.innerHTML = h;

          if (this.collection && (this.collection.length > 0)){
            if (this.editable) {
              h = editableTableBody(this.collection.toJSON(), this.lineNumbers, this.sortKey, this.display, this.selectable);
            } else {
              h = defaultTableBody(this.collection.toJSON(), this.lineNumbers, this.sortKey, this.display, this.selectable);
            }
          } else {
            h = "";
          }
          if (this.editable) {
            this.unbindCellChangeEvents();
          }
          tbody.innerHTML = h;

        }
      } else if (this.$el) {
        _logger.debug("AUGMENTED: AutoTable using jQuery to render.");
        if (this.sortable) {
          this.unbindSortableColumnEvents();
        }
        this.$el("thead").html(defaultTableHeader(this._columns, this.lineNumbers, this.sortKey, this.display, this.selectable));
        var jh = "";
        if (this.editable) {
          jh = editableTableBody(this.collection.toJSON(), this._columns, this.lineNumbers, this.sortKey, this.display, this.selectable);
        } else {
          jh = defaultTableBody(this.collection.toJSON(), this._columns, this.lineNumbers, this.sortKey, this.display, this.selectable);
        }
        if (this.editable) {
          this.unbindCellChangeEvents();
        }
        this.$el("tbody").html(jh);
      } else {
        _logger.warn("AUGMENTED: AutoTable no element anchor, not rendering.");
      }
    } else {
      this.template = "<progress>Please wait.</progress>" + this.compileTemplate() + "<p class=\"message\"></p>";
      this.showProgressBar(true);

      if (this.el) {
        e = (typeof this.el === 'string') ? document.querySelector(this.el) : this.el;
        if (e) {
          e.innerHTML = this.template;
        }
      } else if (this.$el) {
        this.$el.html(this.template);
      } else {
        _logger.warn("AUGMENTED: AutoTable no element anchor, not rendering.");
      }

      if (this.renderPaginationControl) {
        this.bindPaginationControlEvents();
      }
    }
    this.delegateEvents();

    if (this.sortable) {
      this.bindSortableColumnEvents();
    }

    if (this.editable) {
      this.bindCellChangeEvents();
    }

    this.showProgressBar(false);

    return this;
  }
});
