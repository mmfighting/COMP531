import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text="new item" done={false}/>
		</div>)
		// findDOMNode and assert 3 children of the ToDoItem element
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(3)
		// assert the className is ''
		const span=elements.children[1]
		expect(span.className).to.equal('')
		// assert the innerHTML of the todo is the text you initially set
		expect(span.innerHTML).to.equal('new item')
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem toggle={()=>{toggled=true }}/>
		</div>)
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[0])
		expect(toggled).to.equal(true)
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem remove={()=>{removed=true }}/>
		</div>)
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[2])
		expect(removed).to.equal(true)
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem done={true}/>
		</div>)
		const elements = findDOMNode(node).children[0]
		// assert that the rendered className is "completed"
		expect(elements.children[1].className).to.equal("completed")
	})

})
