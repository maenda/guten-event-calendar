/**
 * BLOCK: event-calendar
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { useState } = wp.element;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-event-calendar", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("event-calendar - CGB Block"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("event-calendar — CGB Block"),
		__("CGB Example"),
		__("create-guten-block"),
	],
	attributes: {
		events: {
			type: "array",
			selector: ".event",
		},
		test: {
			type: "string",
			default: "huh?",
			selector: "p",
		},
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const [events, setEvents] = useState(0);
		fetch("https://event-test.local/wp-json/sounds/v1/events") // Call the fetch function passing the url of the API as a parameter
			.then((resp) => resp.json()) // Transform the data into json
			.then(function (data) {
				// console.log(data);
				const results = [];
				console.log(data);
				for (const val of data) {
					results.push(Object.keys(val)[0], ...val);
				}
				// console.log(result);
				setEvents(results);
				props.setAttributes({
					events: results,
					test: "whatevs",
				});
			});
		// Creates a <p class='wp-block-cgb-block-event-calendar'></p>.
		return (
			<div className={props.className}>
				<p> {props.attributes.test}</p>

				<p>— Hello from the backend.</p>
				<p>
					CGB BLOCK: <code>event-calendar</code> is a new Gutenberg block
				</p>
				<p>
					It was created via{" "}
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>
				</p>
				<p>
					<ul className="event">
						{props.attributes.events.map((event) => (
							<li key={event.id}>{event}</li>
						))}
					</ul>
				</p>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		console.log(props);
		return (
			<div className={props.className}>
				<p dangerouslySetInnerHTML={{ __html: props.attributes.test }}></p>

				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>event-calendar</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{" "}
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>
					.
				</p>

				<ul className="event">
					{props.attributes.events.map((event) => (
						<li key={event.id}>{event}</li>
					))}
				</ul>
			</div>
		);
	},
});
