(function ($) {

  var bam = window.bam;
  // bam.loadSync(bam.homePath + 'bam.datagrid2.js');
  bam.loadSync('/shared/scripts/bam/bam.datagrid2.js');


  /** bam.datagrid.Decorator ************************************************/

  /**
   * Subclass of bam.datagrid.DataGrid which supports expanding and collapsing
   * rows using parent-child associated data.
   *
   * @class
   * @name ExpandableDataGrid
   * @alias bam.datagrid.ExpandableDataGrid
   * @inherits bam.datagrid.DataGrid
   * @param {Object} cfg Configuration object
   * @returns {Object} Instance of ExpandableDataGrid
   * @constructor
   
   * @version 1.0
   */
  var ExpandableDataGrid = function (cfg) {

    var that = this,
        togglePosition,
        expandableDecorator = cfg.expandableDecorator || ExpandableDataGrid.expandableDecorator,
        emptyDecorator      = ExpandableDataGrid.emptyDecorator,


    /**
     * Retrieves value of index attribute of parent <tr> which maps to 
     * DataGrid row.
     *
     * @function
     * @static
     * @private
     * @param {HTMLElement} el Target element
     * @returns {Number} DataGrid row index value
     */
    parseRowIndexFromExpandCollapseButton = function (el) {
      return parseInt($(el).parents('tr').attr('index'), 10);
    },


    /**
     * Wraps configured onColumnClick events with collapseAll functionality
     * so that all expanded rows collapse when data is reordered.
     *
     * @function
     * @static
     * @private
     * @param {Object} obj Object containing the onColumnClick event
     */
    wrapColumnClickEvent = function (obj) {

      // Cache existing callback function
      var onColumnClick = obj.onColumnClick;

      if (typeof onColumnClick === 'function') {

        // Overload object's onColumnClick callback with wrapper function
        obj.onColumnClick = function () {

          // Apply configured callback function
          onColumnClick.apply(this, arguments);

          // Collapse all expanded rows
          this.parent.collapseAll.call(this.parent);
        };
      }
    };

    // Wrap column-level onColumnClick events. These events override the 
    // datagrid-level onColumnClick event.
    for (var i = 0, n = cfg.columns.length; i < n; ++i) {
      wrapColumnClickEvent(cfg.columns[i]);
    }

    // Wrap datagrid-level onColumnClick event. If no callback is specified,
    // wrap an empty function to ensure the collapseAll functionality is 
    // subscribed.
    cfg.onColumnClick = cfg.onColumnClick || function () {};
    wrapColumnClickEvent(cfg);


    // If togglePosition is defined, insert a basic toggle element
    if (!isNaN(cfg.togglePosition)) {

      // Limit value of toggle position to +/- column length
      togglePosition = bam.number.limitValueToRange(parseInt(cfg.togglePosition, 10), -cfg.columns.length, cfg.columns.length);

      cfg.columns.splice(togglePosition, 0, {
        dataField:  'is_expanded',
        style:      'expandable_is_expanded',
        visible:    true,
        sortable:   false,
        decorator:  expandableDecorator
      });
      
    // Otherwise, append a hidden column to store is_expanded value
    } else {
      
      cfg.columns.push({
        dataField:  'is_expanded',
        style:      'expandable_is_expanded',
        visible:    false,
        decorator:  emptyDecorator
      });
    }

    this.childrenColumnName = cfg.childrenColumnName || ExpandableDataGrid.CHILDREN_COLUMN_NAME;

    // Append a column definition for children property
    if (!(this.childrenColumnName in cfg.columns)) {
      cfg.columns.push({
        dataField:  this.childrenColumnName,
        style:      'expandable_' + this.childrenColumnName,
        visible:    false,
        decorator:  emptyDecorator
      });
    }

    // Append a storage column for caching expanded rows
    cfg.columns.push({
      dataField:  'expanded_children',
      style:      'expandable_expanded_children',
      visible:    false,
      decorator:  emptyDecorator
    });

    // Append expandable to configured table className
    cfg.tableClass = (cfg.tableClass || '') + ' expandable';


    /**
     * Call parent constructor
     */
    ExpandableDataGrid.superclass.constructor.call(this, cfg);

    /**
     * Assign $.live event handlers to expand and collapse buttons
     */
    $('table#' + this.uniqueId + ' span.expandable_expand').live('click', function (evt, ignore_refresh) {
      that.expand.call(that, parseRowIndexFromExpandCollapseButton(this), ignore_refresh);
    });

    $('table#' + this.uniqueId + ' span.expandable_collapse').live('click', function (evt, ignore_refresh) {
	  that.collapse.call(that, parseRowIndexFromExpandCollapseButton(this), ignore_refresh);
    });

  };


  /**
   * bam.datagrid.ExpandableDataGrid extends bam.datagrid.DataGrid
   */
  bam.object.extend(ExpandableDataGrid, bam.datagrid.DataGrid, {
			
  	removeFooterRow: function(dg,r){
		var i,fr;
		if(($.type(r) === "number") && (r>=0)) {
			for (var i=0; i< dg._data.footerRows.length; i++) {
				fr = dg._data.footerRows[i];
				if (fr.index == r) {
					dg._data.footerRows.splice(i, 1);
				}
			}
			//dg.RowCount = dg._data.footerRows.length;
			//this.reIndexFooterRows.call(this);
		}
		return this;
	},
				

	footerCell : function(dgrid,row,o) {
		var NULL = null;
		var _idx = o, _out = NULL, _cell;
		if($.type(o) === "string") {				
			_cell = dgrid.columns(o);
			if(!!_cell) { _idx = _cell.index; }
		}
		if(($.type(_idx) === "number") && (_idx >= 0 && _idx < row.length)) {
			_out = row[_idx];
		}
		return _out;
	},		
    /**
     * @todo Refactor expand and collapse methods into
     * bam.datagrid.ExpandableRow and add configurable Row, Column, and Cell
     * classes to bam.datagrid.DataGrid
     */


    /**
     * Inserts associated children rows into the DataGrid above the parent row
     * and refreshes the DataGrid view.
     *
     * @method
     * @name expand
     * @alias bam.datagrid.ExpandableDataGrid.prototype.expand
     * @memberOf bam.datagrid.ExpandableDataGrid.prototype
     * @public
     * @param {Number} idx DataGrid index of parent row
     */
    expand: function (idx,ignore_refresh) {
      var row      = this.rows(idx);
	  var footer_rows,fr_len,fr_cell_len,p,q,fr,loc,first_idx;
	  var children,expanded,child,i,n;
	  if (row == null) {
	   	footer_rows = this._data.footerRows;
		first_idx = footer_rows[0].index;
		loc = idx - first_idx;
		fr_len = footer_rows.length;
		fr_cell_len;
	   	for (q=0; q<fr_len;q++) {
			if (footer_rows[q].index == idx) {
				fr = footer_rows[q].cells;
				fr_cell_len = fr.length;
				children = this.footerCell(this,fr,this.childrenColumnName).value;
				expanded = this.footerCell(this,fr,'expanded_children');
			}
		}
		if (this.footerCell(this,fr,'is_expanded').value === true) {
        		return;
      	}
		expanded.value = [];
		for (i = 0, n = children.length; i < n; ++i) {
        		//child = this.insertFooterRow(children[i]).shiftTo(loc + i + 1);
				child = this.insertFooterRow(children[i],null,loc);
       		 	expanded.value.push(child);
      		}
			

     	this.footerCell(this,fr,'is_expanded').value = true;
	  	if (!ignore_refresh) {
      		this.refresh();
	  	}
			
	  } else {
      		children = row.cell(this.childrenColumnName).value;
			expanded = row.cell('expanded_children');
			if (row.cell('is_expanded').value === true) {
        		return;
      		}
			expanded.value = [];
			for (i = 0, n = children.length; i < n; ++i) {
        		child = this.insertRow(children[i]).shiftTo(idx + i + 1);
       		 	expanded.value.push(child);
      		}

     		row.cell('is_expanded').value = true;
	  		if (!ignore_refresh) {
      			this.refresh();
            $("#gameLogPanel table.stats_table td span.expandable_toggle").parent().siblings().andSelf().addClass("summaryCell");
	  		}
	  	}
    },


    /**
     * Removes children rows with parent row, defined by index, from the
     * DataGrid and refreshes the DataGrid view.
     *
     * @method
     * @name collapse
     * @alias bam.datagrid.ExpandableDataGrid.prototype.collapse
     * @memberOf bam.datagrid.ExpandableDataGrid.prototype
     * @public
     */
    collapse: function (idx,ignore_refresh) {
      var row      = this.rows(idx);
	  var footer_rows,fr_len,fr_cell_len,p,q,fr;
	  var children,expanded,child,i,n;
	  if (row == null) {
	   	footer_rows = this._data.footerRows;
		fr_len = footer_rows.length;
		fr_cell_len;
	   	for (q=0; q<fr_len;q++) {
			if (footer_rows[q].index == idx) {
				fr = footer_rows[q].cells;
				fr_cell_len = fr.length;
				children = this.footerCell(this,fr,this.childrenColumnName).value;
				expanded = this.footerCell(this,fr,'expanded_children');
			}
		}
		if (this.footerCell(this,fr,'is_expanded').value === false) {
        		return;
      	}
		while (expanded.value.length > 0) {
			this.removeFooterRow(this,expanded.value.pop().index);
		}
		this.footerCell(this,fr,'is_expanded').value = false;
	  	if (!ignore_refresh) {
      		this.refresh();
	  	}
			
	  } else {
	  
	       	expanded = row.cell('expanded_children').value;
	
	      	if (row.cell('is_expanded').value === false) {
	        	return;
	      	}
	
	      	while (expanded.length > 0) {
	        	this.removeRow(expanded.pop().index);
	      	}
	
	      	row.cell('is_expanded').value = false;
	 
	 	  	if (!ignore_refresh) {
	      		this.refresh();
            $("#gameLogPanel table.stats_table td span.expandable_toggle").parent().siblings().andSelf().addClass("summaryCell");
		  	}
		}
    },


    /**
     * Removes all children rows from the DataGrid and refreshes the DataGrid
     * view.
     *
     * @method
     * @name collapseAll
     * @alias bam.datagrid.ExpandableDataGrid.prototype.collapseAll
     * @memberOf bam.datagrid.ExpandableDataGrid.prototype
     * @public
     */
    collapseAll: function () {

      var rows = this.rows(),
          row,
          i;

      for (i = rows.length - 1; i >= 0; --i) {
        row = rows[i];
        if (row.cell('is_expanded').value === true) {
          this.collapse(row.index);
        }
      }
    }
  });


  /**
   * Property name of data objects that contains array of children objects.
   *
   * @property
   * @memberOf bam.datagrid.ExpandableDataGrid
   * @static
   * @public
   * @type {String}
   */
  ExpandableDataGrid.CHILDREN_COLUMN_NAME = 'children';
  
  
  /**
   * Decorator function which always returns empty string
   *
   * @method
   * @name emptyDecorator
   * @alias bam.datagrid.ExpandableDataGrid.emptyDecorator
   * @memberOf bam.datagrid.ExpandableDataGrid
   * @static
   * @public
   * @returns {String} Empty string
   */
  ExpandableDataGrid.emptyDecorator = function () {
    return '';
  };
  
  
  /**
   * A DataGrid Cell decorator which returns an expand/collapse toggle
   * element depending on the current value of is_expanded cell.
   *
   * @method
   * @name expandableDecorator
   * @alias bam.datagrid.ExpandableDataGrid.expandableDecorator
   * @memberOf bam.datagrid.ExpandableDataGrid
   * @static
   * @public
   * @param {Object} cell DataGrid Cell instance
   * @returns {String} HTML containing expand/collapse toggle
   */
  ExpandableDataGrid.expandableDecorator = function (cell) {
    var parent_children,children;
	var html = '';
	if (typeof(this.parent.childrenColumnName) !== "undefined") {
		parent_children = this.parent.childrenColumnName;
		if (this.cell(parent_children)) {
        	children = this.cell(parent_children).value;

    		if (children instanceof Array) {  //&& children.length > 1
      		/**
       		* By referencing the is_expanded value via its reference to the row,
      	 	* we can access it from other decorators with:
       		* var toggle = ExpandableDataGrid.expandableDecorator.call(this, cell);
      		*/
      		if (this.cell('is_expanded').value === true) {
        		html = '<span class="expandable_toggle expandable_collapse">[-]</span>';
      		} else {
        		html = '<span class="expandable_toggle expandable_expand">[+]</span>';
      		}
    	}
	}
}

    return html;
  };


  /**
   * Utility for merging parent and children data. Maps child data to parent 
   * data.
   *
   * @todo Clarify this documentation!
   *
   * @method
   * @name mergeParentsAndChildren
   * @alias bam.datagrid.ExpandableDataGrid.mergeParentsAndChildren
   * @memberOf bam.datagrid.ExpandableDataGrid
   * @static
   * @public
   * @param {Array} parents Array of parent objects 
   * @param {Array} children Array of children objects to assign to parents
   * @param {String} parentProp Property of parent objects to map to children
   * @param {String} childProp Property of child objects to map to parents
   * @param {Function} sortFn Custom sort function to generate child index
   * @returns {Array} An array of parent objects
   */
  ExpandableDataGrid.mergeParentsAndChildren = function(parents, children, parentProp, childProp, propsToMaintain, sortFn) {

    var hash = {},
        sortFnIsFunction = (typeof sortFn === 'function'),
        idx,
        parent,
        child,
        hashKey,
		hk,
		index,
        merged = [],
		temp_arr = [],
		propToMaintain,
		numProps,
        childrenColumnName = ExpandableDataGrid.CHILDREN_COLUMN_NAME,
        // @todo add paramater for custom col name
        i, n,j,q;

    // Organize children in hash by property and team_seq values
    for (i = 0, n = children.length; i < n; ++i) {

      child = children[i];
      hashKey = child[childProp];
	  
      if (!(hashKey in hash)) {
        hash[hashKey] = [];
      }
	
      idx = sortFnIsFunction ? sortFn(i, child) : i;
      if (isNaN(idx) || (idx < 0)) {
	  	idx = 0;
	  }
      hash[hashKey][idx] = child;
    }
	for (hk in hash) {
		temp_arr = [];
		for (q=0;q<hash[hk].length;q++) {
			if (typeof(hash[hk][q]) !== "undefined") {
				temp_arr.push(hash[hk][q]);
			}
		}
		hash[hk] = temp_arr;
	}
    // Extend or append children to parents

    for (i = 0, n = parents.length; i < n; ++i) {
		if (typeof(parents[i]) !== "undefined") {
      		parent = $.extend(true, {}, parents[i]); // Non-destructive
	  		if (hash[parent[parentProp]].length > 1) {
      			parent[childrenColumnName] = hash[parent[parentProp]];
	  		} else {
	  			if(typeof(propsToMaintain) !== "undefined") {
					propsToMaintain = $.ensureArray(propsToMaintain);
					numProps = propsToMaintain.length;
			
					for (j=0;j<numProps;j++) {
						propToMaintain = propsToMaintain[j];
	  					parent[propToMaintain] = hash[parent[parentProp]][0][propToMaintain];
					}
				}
			}
	 	 }
      	merged.push(parent);
    }
    return merged;
  };


  // Add to bam.datagrid namespace
  bam.datagrid.ExpandableDataGrid = ExpandableDataGrid;

})(jQuery);
