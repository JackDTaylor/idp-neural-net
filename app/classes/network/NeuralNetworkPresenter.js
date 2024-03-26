import BiasedNode from "./node/BiasedNode.js";

export default class NeuralNetworkPresenter {
	/** @type {NeuralNetwork} */
	network = null;

	/** @type {NeuralNetworkController} */
	networkController = null;

	graph;

	graphEl;
	epochMeterEl;

	constructor(network, networkController) {
		this.network = network;
		this.networkController = networkController;

		this.graphEl = document.querySelector('#graph');
		this.epochMeterEl = document.querySelector('#epochMeter');

		this.playBtnEl = document.querySelector('#playBtn');
		this.pauseBtnEl = document.querySelector('#pauseBtn');


		this.network.onInit.push(() => this.render());
		this.network.onErrorPropagated.push(() => this.update());

		this.networkController.onPlayStart.push(() => this.update());
		this.networkController.onPlayStop.push(() => this.update());

		this.render();
	}

	render() {
		const nodes = [];
		const edges = [];

		for(const layer of this.network.layers) {
			for(const node of layer.nodes) {
				nodes.push({
					x: layer.index * this.network.config.xScale,
					y: node.index  * this.network.config.yScale - layer.nodes.length * this.network.config.yScale / 2,

					id:    node.id,
					label: node.id,

					fixed: true,
				})
			}

			for(const edge of layer.outgoingEdges) {
				edges.push({
					id:   edge.id,
					from: edge.sourceNode.id,
					to:   edge.targetNode.id,
				})
			}
		}

		this.graph = new vis.Network(this.graphEl, {nodes, edges}, {
			interaction: {
				hover: true,
				tooltipDelay: 50,
			},
			edges: {
				smooth: false,
			}
		});

		this.update();
	}

	updateGraph() {
		const data = this.graph.body.data;

		const red   = (a, b) => `rgb(${a},${b},${b})`;
		const green = (a, b) => `rgb(${b},${a},${b})`;
		const blue  = (a, b) => `rgb(${b},${b},${a})`;

		for(const layer of this.network.layers) {
			for(const node of layer.nodes) {
				const baseColor = node.bias <= 0 ? blue : red;

				data.nodes.update({
					id: node.id,
					title: node.title,

					...(node instanceof BiasedNode ? {
						borderWidth: 4,
						borderWidthSelected: 4,

						color: {
							border: baseColor(180, 120),

							highlight: {
								border: baseColor(180, 120),
							},

							hover: {
								border: baseColor(180, 120),
							}
						},
					} : {})
				})

				for(const edge of node.outgoingEdges) {
					const baseColor = edge.weight <= 0 ? blue : red;

					data.edges.update({
						id: edge.id,
						title: edge.title,

						color: {
							color:     baseColor(180, 120),
							hover:     baseColor(255, 120),
							highlight: green(180, 120),
						},

						width: Math.abs(edge.weight * 3),
						hoverWidth: 0.5,
						selectionWidth: 1,
					});
				}
			}
		}
	}

	update() {
		this.updateGraph();

		this.epochMeterEl.innerText = this.network.epoch.toLocaleString();

		if(this.networkController.isPlaying) {
			this.playBtnEl.style.display = 'none';
			this.pauseBtnEl.style.display = 'block';
		} else {
			this.playBtnEl.style.display = 'block';
			this.pauseBtnEl.style.display = 'none';
		}
	}
}
