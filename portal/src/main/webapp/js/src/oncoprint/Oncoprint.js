//
//
// Gideon Dresdner <dresdnerg@cbio.mskcc.org> June 2013
//
;
// Creates an oncoprint on the div.
// The parameters is an object that contains:
// clinicalData, clinical_attrs (list), genes (list), geneData,
//
// and width (number) for the width of the oncoprint
// and legend (undefined or div element)
define("Oncoprint",
        [           "OncoprintUtils",  "MemoSort"],
        function(   utils,              MemoSort) {
            return function(div, params,tracks) {
                params.clinicalData = params.clinicalData || [];        // initialize
                params.clinical_attrs = params.clinical_attrs || [];

                // make strings of numbers into numbers
                var clinicalData = params.clinicalData.map(function(i) {
                    if (!utils.is_discrete(i.attr_val)) {
                        i.attr_val = parseFloat(i.attr_val);
                    }
                    return i;
                });

                var data = clinicalData.concat(params.geneData);

                var clinical_attrs = params.clinical_attrs      // extract attr_ids
                    .map(function(attr) { return attr.attr_id; });

                // handle the case when a list of strings is passed instead of proper
                // clinical attribute objects
                clinical_attrs = clinical_attrs.filter(function(i) { return i !== undefined; });
                clinical_attrs = clinical_attrs || params.clinical_attrs;

//                var attributes = clinical_attrs.concat(params.genes);
                var attributes = tracks.concat(params.genes);

                data = utils.process_data(data, attributes);

                // keeps track of the order specified by the user (translates to vertical
                // order in the visualization)
                var attr2index = (function() {
                    var to_return = {};

                    attributes.forEach(function(attr, i) {
                        to_return[attr] = i;
                    });

                    return to_return;
                }());

                // returns the vertical position of the attr
                var vertical_pos = function(attr) {
                    return dims.vert_space * attr2index[attr];
                };

                if (clinicalData === []
                        && params.clinical_attrs !== undefined) {
                    throw {
                        name: "Data Mismatch Error",
                        message: "There are clinical attributes for nonexistant clinical data"
                    }
                }

                var id2ClinicalAttr = utils.createId2ClinicalAttr(params.clinical_attrs);

                var gapSpaceGeneClinic = 10;

                var dims = (function() {
                    var rect_height = 23;
                    var mut_height = rect_height / 3;
                    var vert_padding = 6;
                    var label_width = utils.label_width(attributes.map(
                            function(attr) {
                                var maybe = utils.maybe_map(id2ClinicalAttr);
                                var value = maybe(attr);
                                return value === attr ? value : value.display_name;

                            }));

                    var clinical_height = (2/3) * rect_height;
                    var clinical_offset = (1/6) * rect_height;

                    return {
                    width: data.length * (5.5 + 3),
                    height: (rect_height + vert_padding) * attributes.length,
                    rect_height: rect_height,
                    rect_width: 5.5,
                    vert_padding: vert_padding,
                    vert_space: rect_height + vert_padding,
                    hor_padding: 3,
                    mut_height: mut_height,
                    label_width: label_width,
                    clinical_height: clinical_height,
                    clinical_offset: clinical_offset
                    };
                }());
                //    var margin = { top: 80, right: 80, left: 80, bottom: 80 };
                    
                // make labels and set up the table for proper scrolling, etc.
                var table = d3.select(div)
                    .append('table')
                    .append('tr')
                    .attr('id','oncoprint_table')
                    .attr('valign','top');
                    
                var remove_oncoprint = function() {
                    d3.select("#" + div.id + ' table').remove();
                };

                // hack to get the label flush with the tracks in Firefox
                // the discrepancy is due to the difference in the way browsers display
                // <table>.  Assume that other browsers behave like chrome and that Firefox
                // is the exception.
                var is_firefox = navigator.userAgent.indexOf("Firefox") !== -1;
                var browser_offset = is_firefox ? 16 : 0;

                var label_svg = table
                    .append('td')
                    .append('svg')
                    .attr('height', function(){
                        return params.clinical_attrs.length > 0 ? dims.height + browser_offset + gapSpaceGeneClinic : dims.height + browser_offset;
                        }) // modified by dong if there are clinic attributes added
                    .attr('width', '' + dims.label_width)
                    .attr('id', 'label');

                var label = label_svg.selectAll('text')
                    .data(attributes)
                    .enter()
                    .append('text')
                    .attr('font-size', '12px')
                    .attr('x', 0)
                    .attr('y', function(d) { 
                        if(_.find(params.genes, function(num){ return num === d; }) !==undefined && params.clinical_attrs.length > 0)
                        {
                            return (dims.vert_space / 1.80) + gapSpaceGeneClinic + vertical_pos(d); 
                        }
                        
                        return (dims.vert_space / 1.80) + vertical_pos(d);
                    });

                label.append('tspan')       // name
                    .attr('text-anchor', 'start')
                    .attr('font-weight', 'bold')
                    .attr('fill','black')
                    .attr('cursor','move')
                    .attr('class','attribute_name')
                    .text(function(d) {
                        var maybe = utils.maybe_map(id2ClinicalAttr);
                        var value = maybe(d);
                        return value === d ? value : value.display_name;
                    });
                    

                var group=label_svg.append('g');
                
                group.selectAll('p')
                    .data(attributes)
                    .enter()
                    .append('svg:image')
                    .attr('class','oncoprint_Sort_Button')
                    .attr('width', 15)
                    .attr('height', 15)
                    .attr("xlink:href",function(d){
                        var maybe = utils.maybe_map(id2ClinicalAttr);
                        var value = maybe(d);
                        value === d ? value : value.display_name;
                        if(_.indexOf(params.genes,d)<0) 
                        {
                            var indexOfClinicAttr = _.indexOf(attributes,d);
                            if(params.sortStatus[indexOfClinicAttr] === "nonSort")
                            {
                                return "images/nonSort.svg";
                            }
                            
                            if(params.sortStatus[indexOfClinicAttr] === "decresort")
                            {
                                return "images/decreaseSort.svg";
                            }
                            
                            return "images/increaseSort.svg";
                        }

                            return "";
                        })
                    .attr('x', '' + dims.label_width-40)
                    .attr('text-anchor', 'end')
                    .attr('y', function(d) {
                        return (dims.vert_space / 1.80) + vertical_pos(d)-10; });  
           
                var percentLabel = group.selectAll('text')
                    .data(attributes)
                    .enter()
                    .append('text')
                    .attr('font-size', '12px')
                    .attr('x', 0)
                    .attr('y', function(d) {
                        if(_.find(params.genes, function(num){ return num === d; }) !==undefined && params.clinical_attrs.length > 0)
                        {
                            return (dims.vert_space / 1.80) + gapSpaceGeneClinic + vertical_pos(d); 
                        }
                        
                        return (dims.vert_space / 1.80) + vertical_pos(d);
                
                    });
            
                var gene2percent = utils.percent_altered(params.geneData);
                percentLabel.append('tspan')       // percent_altered
                    .text(function(d) {
                        return (d in gene2percent) ? gene2percent[d].toString() + "%" : "x"; })
                    .attr('fill',function(d){ return (d in gene2percent) ? 'black':'#87CEFA'})
                    .attr('class',function(d){ return (d in gene2percent) ? 'regular':'special_delete'})
                    .attr('alt',function(d){ return (d in gene2percent) ? 'regular':d})
                    .attr('x', '' + dims.label_width)
//                    .attr('cursor', 'pointer')
                    .attr('text-anchor', 'end');
                    // remove the tspan that would have contained the percent altered
                    // because it messes with the label placement in the pdf download
//                    .filter(function(d) { return gene2percent[d] === undefined; }).remove();

//                label.append('tspan')       // percent_altered
//                    .text(function(d) {
//                        return (d in gene2percent) ? gene2percent[d].toString() + "%" : " "; })
//                    .attr('text-anchor', 'end')
//                    // remove the tspan that would have contained the percent altered
//                    // because it messes with the label placement in the pdf download
//                    .filter(function(d) { return gene2percent[d] === undefined; }).remove();

                var container_width = $('#td-content').width();              // snatch this from the main portal page
                container_width = (container_width ? container_width : params.width);    // see if this has specified by user
                container_width = (container_width ? container_width : 1250);            // default setting
                var main_svg = table
                    .append('td')
                    .append('div')      // control overflow to the right
                    .style('width', container_width - 70 - dims.label_width + 'px') // buffer of, say, 70
                    .style('display', 'inline-block')
                    .style('overflow-x', 'auto')
                    .style('overflow-y', 'hidden')
                    .append("svg")
                    .attr('width', dims.width)
                    .attr('height', function(){
                        return params.clinical_attrs.length > 0 ? dims.height + browser_offset + gapSpaceGeneClinic : dims.height + browser_offset;
                        }); // modified by dong if there are clinic attributes added)

                var colors = utils.colors;     // alias

                // helper function
                // *signature:* number, number -> string
                var translate = function(x,y) {
                    return "translate(" + x + "," + y + ")";
                };

                // params: data
                // updating the samples based on the data (entering and exiting)
                var update = function(data) {

                    // toss in the samples
                    var columns = main_svg.selectAll('g')               // array of arrays
                        .data(data, function(d) { return d.key; });     // N.B.

                    // throw them in, 100 (i.e. way off) to the right
                    columns.enter()
                        .append('g')
                        .attr('class', 'sample')
                        //        .attr('transform', function(d,i) { return translate(x(d.key), 0); })
                        .attr('transform', translate(dims.width + 100, 0));

                    // simply remove columns on exit
                    columns.exit().remove();

                    var els = columns.selectAll('.oncoprint-els')
                        .data(function(d) {
                            return d.values;
                        });

                    els.exit().remove();

                    var enter = els.enter();

                    var attr2range = utils.make_attribute2scale(params.clinical_attrs, clinicalData);

                    // N.B. fill doubles as cna
                    var fill = enter.append('rect')
                        .attr('fill', function(d) {
                            if (utils.is_gene(d)) {
                                return utils.cna_fills[d.cna];
                            }
                            else if (utils.is_clinical(d)) {

                                //d.attr_id=d.attr_id.toLowerCase().charAt(0).toUpperCase() + d.attr_id.toLowerCase().slice(1);// added by dong li
                                var result = attr2range[d.attr_id](d.attr_val);
                                
                                return d.attr_val === "NA"
                            ? colors.grey       // attrs with value of NA are colored grey
                            : result;
                            }
                        })
                    .attr('height', function(d) {
                        return d.attr_id === undefined ? dims.rect_height : dims.clinical_height;
                        //     return dims.rect_height;
                    })
                    .attr('width', dims.rect_width)
                        .attr('y', function(d) {
                            if(params.clinical_attrs.length > 0)
                            {
                                return d.attr_id === undefined
                                ? vertical_pos(utils.get_attr(d)) + gapSpaceGeneClinic
                                : vertical_pos(utils.get_attr(d)) + dims.clinical_offset;
                            }
                            else
                            {
                                return d.attr_id === undefined
                                ? vertical_pos(utils.get_attr(d))
                                : vertical_pos(utils.get_attr(d)) + dims.clinical_offset;
                            }
                        });

                    var fusion = enter.append('path')
                        .attr('d', "M0,0L0,"+dims.rect_height+" "+dims.rect_width+","+dims.rect_height/2+"Z")
                        .attr('transform',function(d) {return 'translate(0,'+(vertical_pos(utils.get_attr(d)))+')';});
                    fusion.filter(function(d) {
                        return d.mutation === undefined || !/fusion($|,)/i.test(d.mutation.toLowerCase());
                    }).remove();
                    
                    //seperate the mutation type
                    var seperateMuation = function(mutation){
                        
                        if(params.mutationColor === 'singleColor' || params.mutationColor === undefined)
                        {
                            return 'green';
                        }
                        else if(params.mutationColor === 'multiColor')
                        {             
                            var mutationSplit;

                            if(mutation !== undefined)//multiple mutations
                            {
                                mutationSplit = mutation.split(',');

                                if(mutationSplit.length > 1)
                                {
                                    for(var i = 0; i < mutationSplit.length; i++)
                                    {
                                        if((/^[A-z]([0-9]+)[A-z]$/g).test(mutationSplit[i]))
                                        {
                                            continue;
                                        }
                                        else
                                        {
                                            return 'black';
                                        }
                                    }
                                    
                                    return 'green';
                                }
                            }

                            if((/^[A-z]([0-9]+)[A-z]$/g).test(mutationSplit))
                            {
                                return 'green';//Missense_mutation
                            }
                            else if((/^([A-Z]+)([0-9]+)del$/g).test(mutationSplit) )
                            {
                                return '#9F8170';//inframe
                            }
                            else 
                            {
                                return 'black';
                            }
                        }
//                        else
//                        {
//                            var mutationSplit;
//                            
//                            if(mutation !== undefined)//multiple mutations
//                            {
//                                mutationSplit = mutation.split(',');
//
//                                if(mutationSplit.length > 1)
//                                {
//                                    for(var i = 0; i < mutationSplit.length; i++)
//                                    {
//                                        if((/^[A-z]([0-9]+)[A-z]$/g).test(mutationSplit[i]))
//                                        {
//                                            continue;
//                                        }
//                                        else
//                                        {
//                                            return '#FF00FF';
//                                        }
//                                    }
//                                    
//                                    return 'green';
//                                }
//                            }
//                            
//                            if((/^[A-z]([0-9]+)[A-z]$/g).test(mutationSplit))
//                            {
//                                return 'green';//Missense_mutation
//                            }
//                                else if((/^[A-z*]([0-9]+)[A-z]{2}$/g).test(mutationSplit))
//                            {
//                                return 'black'; //Frame_shift_del
//                            }
//                                else if((/^[A-Z]([0-9]+)[*]$/g).test(mutationSplit))
//                            {
//                                return 'Yellow'; //Nonsense_Mutation
//                            }
//                                else if((/^[A-Z]([0-9]+)_splice$/g).test(mutationSplit))
//                            {
//                                return 'white'; //Splice_Site
//                            }
//                                else if((/^([A-Z]+)([0-9]+)del$/g).test(mutationSplit))
//                            {
//                                return 'Pink'; //IN_frame_del
//                            }
//                                else 
//                            {
//                                return 'blue';
//                            }
//                        }
                    };
                    var mut = enter.append('rect')
                        .attr('fill', function (d){ return seperateMuation(d.mutation);})
                        .attr('height', dims.mut_height)
                        .attr('width', dims.rect_width)
                        .attr('y', function(d) {
                            if(params.clinical_attrs.length === 0) //to check are there clinic data input
                            {
                                gapSpaceGeneClinic = 0;
                            }
                            return dims.mut_height + gapSpaceGeneClinic + vertical_pos(utils.get_attr(d)); });
                    mut.filter(function(d) {
                        if (d.mutation === undefined) return true;
                        var aas = d.mutation.split(","); // e.g. A32G,fusion
                        for (var i=0, n=aas.length; i<n; i++) {
                            if (!/fusion$/i.test(aas[i])) return false;
                        }
                        return true;
                    }).remove();
                    
                    var sym = d3.svg.symbol().size(dims.rect_width * 3);
                    var rppa = enter.append('path')
                        .attr('d', sym.type(function(d) {
                            return d.rppa === "UPREGULATED" ? "triangle-up" : "triangle-down"; }))
                        .attr('transform', function(d) {
                            // put the triangle in the right spot: at the top if
                            // UNREGULATED, at the bottom otherwise
                            var dy = dims.rect_height;
                            dy = d.rppa === "UPREGULATED" ? dy * 0.1 : dy / 1.1;
                            if(params.clinical_attrs.length === 0) //to check are there clinic data input
                            {
                                gapSpaceGeneClinic = 0;
                            }
                            return translate(dims.rect_width / 2, dy + gapSpaceGeneClinic + vertical_pos(utils.get_attr(d))); });
                        rppa.filter(function(d) {
                            return d.rppa === undefined;
                        }).remove();

                    var mrna = enter.append('rect')
                        .attr('y', function(d) { 
                                    if(params.clinical_attrs.length === 0) //to check are there clinic data input
                                    {
                                        gapSpaceGeneClinic = 0;
                                    }
                                    return vertical_pos(utils.get_attr(d)) + gapSpaceGeneClinic; })
                        .attr('height', dims.rect_height)
                        .attr('width', dims.rect_width)
                        .attr('stroke-width', 2)
                        .attr('stroke-opacity', 1)
                        .attr('stroke', function(d) { return d.mrna === "UPREGULATED" ? '#FF9999' : '#6699CC' })
                        .attr('fill', 'none');
                    mrna.filter(function(d) {
                        return d.mrna === undefined;
                    }).remove();
                };

                update(data);
                //needed to modify by dong li
                var clinicalLength = parseInt(params.clinicalData.length/params.clinical_attrs.length);
                var geneLength = params.geneData.length/params.genes.length;
                
                if(clinicalLength > 0 && clinicalLength !== geneLength)
                {
                    for(var u =0; u<geneLength; u++)
                    {
                        var newAddedClinic = params.clinicalData.slice(geneLength*(params.clinical_attrs.length-1)); 
                        var geneElementValue = params.geneData[u].sample;
                        var clinicalElementValueIndex = _.find(newAddedClinic, function(element){ return element.sample === geneElementValue;});
                        
                        if(clinicalElementValueIndex === undefined) 
                        {
                            var NAelement = {
                                attr_id:params.clinicalData[params.clinicalData.length-1].attr_id, //
                                attr_val:"NA",
                                sample: geneElementValue
                            };
                            
                            params.clinicalData.push(NAelement);
                        }
                    }
                }
                cbio.util.autoHideOnMouseLeave($("#oncoprint_table"), $(".special_delete"));
                cbio.util.autoHideOnMouseLeave($("#oncoprint_table"), $(".oncoprint_Sort_Button"));

                $('.attribute_name').qtip({
                content: {text: 'Click to drag '},
                position: {my:'left bottom', at:'top middle', viewport: $(window)},
                style: { classes: 'qtip-light qtip-rounded qtip-shadow qtip-lightyellow' },
                show: {event: "mouseover"},
                hide: {fixed: true, delay: 100, event: "mouseout"}
                });

                var altered
                    = utils.filter_altered(utils.nest_data(params.geneData));
                // TODO: nesting again, quick and dirty

                // The State object is our representation of the state of the oncoprint.
                // It is encapsulates a representation of the state of the oncoprint (is
                // whitespace on / off, what subset of the data is currently being
                // visualized, etc) and returns a set of functions for manipulating that
                // state.
                //
                // This object is what is eventually returned to the user for manipulating
                // the oncoprint
                var State = (function() {

                    // initialize state variables
                    var state = {
                        data: data,
                        whitespace: true,
                        rect_width: dims.rect_width,
                        hor_padding: dims.hor_padding,
                        attrs: params.genes.concat(clinical_attrs)
                    };

                    // takes a list of samples and returns an object that contains
                    // a function f,
                    // a map, sample2index
                    // and a constant, svg_width
                    //
                    // f : sample id --> x-position in oncoprint
                    var xscale = function(samples) {
                        var sample2index = {};  // quick indexing
                        for (var i = 0; i < samples.length; i+=1) {
                            sample2index[samples[i]] = i;
                        }

                        // params: i, sample index
                        // returns: the width of the svg to contain those samples.
                        var xpos = function(i) {
                            return i * (state.rect_width + (state.whitespace ? state.hor_padding : 0));
                        };

                        var svg_width_offset = 50;
                        return {
                            scale: function(d) { return xpos(sample2index[d]); },
                                sample2index: sample2index,
                                svg_width: svg_width_offset + xpos(samples.length)
                        };
                    };

                    // takes data and return a list of sample_ids in order
                    var pick_sample_id = function(internal_data) {
                        return internal_data.map(function(i) { return i.key; });
                    };

                    // composition of xscale and pick_sample
                    var data2xscale = function(data) {
                        return xscale(pick_sample_id(data));
                    };

                    // params:  duration
                    //              how long the transition should last.  If omitted, does
                    //              no animation
                    //          direction
                    //              'left' or 'right' . specify the direction to do the
                    //              animation.  Read as "from the <direction>." Defaults to
                    //              'left'
                    //
                    // puts all the samples in the correct horizontal position
                    var horizontal_translate = function(duration, direction) {
                        // re-sort
                        var x = data2xscale(state.data);

                        // resize the svg
                        var main_svg_transition = duration ? main_svg.transition(duration) : main_svg;
                        main_svg_transition.attr('width', x.svg_width);

                        d3.selectAll('.sample rect').transition()
                            .attr('width', state.rect_width);

                        var sample_transition = d3.selectAll('.sample').transition();

                        direction = direction || 'left';            // default
                        direction = direction.toLowerCase();        // defense
                        if (duration) {
                            if (direction === 'right') {
                                sample_transition.duration(function(d) {
                                    // reverse the index
                                    return duration + state.data.length - x.sample2index[d.key] * 4;
                                });
                            }
                            else if (direction === 'left') {
                                sample_transition.duration(function(d) {
                                    return duration + x.sample2index[d.key] * 4;
                                });
                            }
                            else {      // only support 'left' and 'right'
                                throw new Error("invalid direction specified to the transition");
                            }
                        }

                        // do the transition to all samples
                        sample_transition.attr('transform', function(d) { return translate(x.scale(d.key),0); });
                    };

                    // if bool === true, show unaltered cases, otherwise, don't
                    var show_unaltered_bool = true;     // saves state for toggleUnalteredCases
                    var showUnalteredCases = function(bool) {
                        show_unaltered_bool = bool;     // set the state

                        if (bool) {
                            state.data = data;
                            update(state.data);
                        } else {
                            var altered_data = data.filter(function(d) { return altered.has(d.key); });
                            state.data = altered_data;
                            update(state.data);
                        }
                        horizontal_translate(1);

                        return state.data;
                    };

                    var ANIMATION_DURATION = 750;

                    // params: [bool].  If bool is passed as a parameter,
                    // whitespace is set to the bool, otherwise, flip it from whatever it currently is
                    var toggleWhiteSpace =  function(bool) {
                        state.whitespace = bool === undefined ? !state.whitespace : bool;
                        horizontal_translate(ANIMATION_DURATION, state.whitespace ? 'right' : 'left');
                    };

                    // params:
                    // <by> is either 'genes', 'clinical', or 'alphabetical', 'custom'
                    // indicating how to sort the oncoprint.  Either by gene data first,
                    // clinical data first, or alphabetically.
                    //
                    // [cases] optional for 'genes', 'clinical', 'alphabetical', but REQUIRED for 'custom.
                    // Lists of cases to sort the data by
                    //
                    // returns the sorted data
                    //
                    // throws unsupported sort option if something other than the 3 options
                    // above is given.
                    var sortBy = function(by, cases) {
                        if (by === 'genes') {
//                            state.attrs = params.genes.concat(clinical_attrs);
                            state.attrs = params.genes.slice(0);
                            for(var i = 0; i < clinical_attrs.length; i++)
                            {
                                // delete clinic i from attrs list if the icon is non-sort
                                if($('.oncoprint_Sort_Button')[i].attributes.href.value!=="images/nonSort.svg")
                                {
                                    state.attrs.push(clinical_attrs[i]);
                                }
                            }
                            state.data = MemoSort(state.data, state.attrs);
                        }
                        else if (by === 'clinical') {
                            state.attrs = [];
                           
                            for(var i = 0; i < clinical_attrs.length; i++)
                            {
                                // delete clinic i from attrs list if the icon is non-sort
                                if($('.oncoprint_Sort_Button')[i].attributes.href.value!=="images/nonSort.svg")
                                {
                                    state.attrs.push(clinical_attrs[i]);
                                }
                            }
                            
                            state.attrs = state.attrs.concat(params.genes);
                            state.data = MemoSort(state.data, state.attrs);
                            
                            for(var i = 0; i < clinical_attrs.length; i++)
                            {
                                if($('.oncoprint_Sort_Button')[i].attributes.href.value==="images/decreaseSort.svg")
                                {
                                    //reverse the order of clinic attribute i
                                    for(var j=0; j< state.data.length/2; j++)
                                    {
                                        state.data[j].values[i]=state.data[state.data.length -1 - j].values[i];
                                    }
                                }
                            }
                        }
                        else if (by === 'alphabetical') {
                            state.data = state.data.sort(function(x,y) {
                                return x.key < y.key;
                            });
                        }
                        else if (by === 'custom') {
                            if (cases === undefined) {
                                throw new Error("cannot sort by custom cases set order with a list of cases");
                            }

                            // map of case id -> index in array
                            // just a small optimization so that you don't call indexOf
                            var case2index = cases.reduce(function(c2index, c, index) {
                                c2index[c] = index;
                                return c2index;
                            }, {});

                            state.data = state.data.sort(function(x,y) {
                                return case2index[x.key] - case2index[y.key];
                            });
                        }
                        else {
                            throw new Error("unsupported sort option: ") + JSON.stringify(by);
                        }
                        horizontal_translate(ANIMATION_DURATION);                       
                        return state.data;
                    };

                    // create a legend if user asked for it
                    var attr2rangeValue = utils.attr_data_type2range(params.clinicalData, params.clinical_attrs.length);
                    var attr2rangeFuntion = utils.make_attribute2scale(params.clinical_attrs, params.clinicalData);
                    if (params.legend) {
                        utils.legend(params.legend,utils.gene_data_type2range(params.geneData), dims.label_width, attr2rangeValue,attr2rangeFuntion);
                    }
                    
                    
                    var memoSort = function(attributes, animation) {
                        state.data = MemoSort(state.data, attributes);
                        if (animation) { horizontal_translate(ANIMATION_DURATION); }
                        else { horizontal_translate(); }

                        return state.data;
                    };

                    var randomMemoSort = function() {
                        // randomly shuffle an array
                        var shuffle = function(array) {
                            var m = array.length, t, i;
                            while (m)  {
                                i = Math.floor(Math.random() * m--);
                                t = array[m], array[m] = array[i], array[i] = t;
                            }
                            return array;
                        };

                        state.attrs = shuffle(attributes);
                        state.data = MemoSort(state.data, state.attrs);
                        horizontal_translate(ANIMATION_DURATION);
                        return state.attrs;
                    };

                    var zoom = function(scalar, animation) {
                        // save state
                        old_rect_width = state.rect_width;

                        // change state
                        state.rect_width = scalar * dims.rect_width;
                        state.hor_padding = scalar * dims.hor_padding;

                        // which direction we are zooming in?
                        var direction = old_rect_width - state.rect_width > 0 ? 'left' : 'right';
                        if (animation) {
                            horizontal_translate(ANIMATION_DURATION, direction);
                        } else {
                            horizontal_translate();
                        }
                    };

                    // takes an oncoprint object and returns a serialized string
                    //
                    // *signature:* `undefined -> string`
                    var getPdfInput = function() {
                        var width = dims.width + dims.label_width;
                        var svg = main_svg[0][0];
                        var x = data2xscale(state.data);

                        // helper function
                        // takes a DOM element and does the xml serializer thing
                        var serialize = function(el) {
                            return  (new XMLSerializer()).serializeToString(el);
                        };

                        // helper function
                        // maps a jquery array on the function fun (use the jquery callback signature),
                        // converts to javascript array and join on ""
                        var map_join = function($array, fun) {
                            return $array.map(fun).toArray().join("");
                        };

                        var out = map_join($(svg).children(),
                                function(index, sample_el) {
                                    var sample_id = d3.select(sample_el).data()[0].key;
                                    var transformed = $(sample_el).clone();
                                    transformed = transformed.attr('transform', translate(dims.label_width + x.scale(sample_id), 0));

                                    return serialize(transformed[0]);
                                });
                                
                        var out_svg = map_join($(svg).children(),
                                function(index, sample_el) {
                                    var sample_id = d3.select(sample_el).data()[0].key;
                                    var transformed = $(sample_el).clone();
                                    transformed = transformed.attr('transform', translate(0,dims.vert_space));

                                    return serialize(transformed[0]);
                                });

                        var labels = $('#oncoprint svg#label').children().clone();
                        labels.find("image").remove();
                        labels = map_join(labels, function(index, label) {
                            return serialize(label);
                        });
                        
                        if($('#oncoprint_legend .genetic_legend_table svg')[0]!== undefined)
                        {
                            if($('#oncoprint #oncoprint_legend .genetic_legend_table svg')[0]!== undefined)
                            {
                                var verticalTranslateWidth= parseInt($('#oncoprint #oncoprint_legend .genetic_legend_table svg')[0].attributes.width.value);
                            }
                            else
                            {
                                var verticalTranslateWidth= parseInt($('#oncoprint #oncoprint_table svg')[0].attributes.width.value+$('#oncoprint #oncoprint_table svg')[1].attributes.width.value); 
                            }
                            
                            if($('#oncoprint #oncoprint_legend .genetic_legend_table svg')[0]!== undefined)
                            {
                                var generic_legends = $('#oncoprint #oncoprint_legend .genetic_legend_table #legend').children().clone();
                                generic_legends = map_join(generic_legends, function(index,legend) {
                                    return serialize(legend);
                                });
                                var find1 = '<svg xmlns="http://www.w3.org/2000/svg"';
                                var find2 = '</svg>';
                                var find3 = 'xmlns="http://www.w3.org/1999/xhtml"';
                                var re1 = new RegExp(find1, 'g');
                                var re2 = new RegExp(find2, 'g');
                                var re3 = new RegExp(find3, 'g');
                                generic_legends = generic_legends.replace(re1, '<g').replace(re2, '</g>').replace(re3, '');
                                generic_legends = "<g transform=\"translate(0,"+ (dims.height + 10) + ")\">" + generic_legends + "</g> ";

                                var generic_legends_svg = $('#oncoprint #oncoprint_legend .genetic_legend_table #legend_svg').children().clone();
                                generic_legends_svg = map_join(generic_legends_svg, function(index,legend) {
                                    return serialize(legend);
                                });
                                var find1 = '<g xmlns="http://www.w3.org/2000/svg"';
                                var n = 0;
                                while(generic_legends_svg.indexOf(find1) > -1)
                                {
                                    generic_legends_svg = generic_legends_svg.replace(find1, '<g transform = "translate('+ (144*n) +',0)"');
                                    n++; 
                                }
                                generic_legends_svg = "<g transform=\"translate("+ verticalTranslateWidth +","+ (dims.height + 10) + ")\">" + generic_legends_svg + "</g> ";
                            }
                            else
                            {
                                var generic_legends = $('#oncoprint_legend .genetic_legend_table #legend').children().clone();
                                generic_legends = map_join(generic_legends, function(index,legend) {
                                    return serialize(legend);
                                });
                                var find1 = '<svg xmlns="http://www.w3.org/2000/svg"';
                                var find2 = '</svg>';
                                var find3 = 'xmlns="http://www.w3.org/1999/xhtml"';
                                var re1 = new RegExp(find1, 'g');
                                var re2 = new RegExp(find2, 'g');
                                var re3 = new RegExp(find3, 'g');
                                generic_legends = generic_legends.replace(re1, '<g').replace(re2, '</g>').replace(re3, '');
                                generic_legends = "<g transform=\"translate(0,"+ (dims.height + 10) + ")\">" + generic_legends + "</g> ";

                                var generic_legends_svg = $('#oncoprint_legend .genetic_legend_table #legend_svg').children().clone();
                                generic_legends_svg = map_join(generic_legends_svg, function(index,legend) {
                                    return serialize(legend);
                                });
                                var find1 = '<g xmlns="http://www.w3.org/2000/svg"';
                                var n = 0;
                                while(generic_legends_svg.indexOf(find1) > -1)
                                {
                                    generic_legends_svg = generic_legends_svg.replace(find1, '<g transform = "translate('+ (144*n) +',0)"');
                                    n++; 
                                }
                                generic_legends_svg = "<g transform=\"translate("+ (verticalTranslateWidth+20) +","+ (dims.height + 10) + ")\">" + generic_legends_svg + "</g> ";
                            }

                            var mutation_legends = $('#oncoprint #oncoprint_legend .mutation_legend_table #legend').children().clone();
                            mutation_legends = map_join(mutation_legends, function(index,legend) {
                                return serialize(legend);
                            });
                            var find1 = 'y="23"';
                            var j=0;
                            while(mutation_legends.indexOf(find1) > -1)
                            {
                                mutation_legends = mutation_legends.replace(find1, 'y = "' + (dims.vert_space * j + 23)+'"');
                                j++; 
                            }
                            mutation_legends = "<g transform=\"translate(0,"+ (dims.height + 10 + dims.vert_space) + ")\">" + mutation_legends + "</g> ";

                            var mutation_legends_svg = $('#oncoprint #oncoprint_legend .mutation_legend_table #legend_svg').children().clone();
                            mutation_legends_svg = map_join(mutation_legends_svg, function(index,legend) {
                                return serialize(legend);
                            });
                            var find1 = '<g xmlns="http://www.w3.org/2000/svg" transform="translate(0,0)"';                    
                            var i=0;
                            while(mutation_legends_svg.indexOf(find1) > -1)
                            {
                                mutation_legends_svg = mutation_legends_svg.replace(find1, '<g transform = "translate(0,'+ (dims.vert_space * i) +')"');
    //                            mutation_legends_svg = mutation_legends_svg.replace(find1, '<g transform = "translate(0,'+ (dims.vert_space * i) +')"');
                                i++;
                            }
                            mutation_legends_svg = "<g transform=\"translate("+ verticalTranslateWidth +","+ (dims.height + 10 + dims.vert_space) + ")\">" + mutation_legends_svg + "</g> ";
                        }
                        
                        out += labels;
                        out += generic_legends;
                        out += generic_legends_svg;
                        out += mutation_legends;
                        out += mutation_legends_svg;

                        return "<svg height=\"" + (dims.height + verticalTranslateWidth + dims.height) + "\" width=\"" + width + "\">" + out + "</svg>";
                    };

                    return {
                        remove_oncoprint: remove_oncoprint,
                        memoSort: memoSort,
                        randomMemoSort: randomMemoSort,
                        getData: function() { return state.data; },
                        toggleWhiteSpace: toggleWhiteSpace,
                        zoom: zoom,
                        showUnalteredCases: showUnalteredCases,
                        toggleUnalteredCases: function() {
                            show_unaltered_bool = !show_unaltered_bool;
                            showUnalteredCases(show_unaltered_bool);
                        },
                        sortBy: sortBy,
                        getPdfInput: getPdfInput
                    };
                })();

                utils.make_mouseover(d3.selectAll('#' + div.id + ' .sample *'),{linkage:true});

                return State;
            };

        });
