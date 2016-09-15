import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle()
        expect(p).to.be.ok
        expect(p.mass).to.be.a("number")
        expect(p.position).to.be.ok
        expect(p.position[0]).to.be.a("number")
        expect(p.position[1]).to.be.a("number")
        expect(p.velocity).to.be.ok
        expect(p.velocity[0]).to.be.a("number")
        expect(p.velocity[1]).to.be.a("number")
        expect(p.acceleration).to.be.ok
        expect(p.acceleration[0]).to.be.a("number")
        expect(p.acceleration[1]).to.be.a("number")
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        var p = particle()
        p.position=[1, 1]
        p.velocity=[0.5, -0.5]
        const _canvas = { height: 800, width: 800 }
        const { position } = update(p, 1.0, _canvas)
        expect(position[0]).is.closeTo(1.5, 0.01)
        expect(position[1]).is.closeTo(0.5, 0.01)
    })

    it('should update the position by the velocity and time delta', () => {
        var p = particle()
        p.position=[1, 1]
        p.velocity=[0.5, -0.5]
        //console.log(p)
        const _canvas = { height: 800, width: 800 }
        const { position } = update(p, 2.0, _canvas) // dt is different here
        expect(position[0]).is.closeTo(2.0, 0.01)
        expect(position[1]).is.closeTo(0.0, 0.01)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        var p = particle()
        p.position=[1, 1]
        p.velocity=[0.5, -0.5]
        p.acceleration=[0.05, -0.05]
        const _canvas = { height: 800, width: 800 }
        const { velocity } = update(p, 1.0, _canvas)
        expect(velocity[0]).to.closeTo(0.55, 0.01)
        expect(velocity[1]).to.closeTo(-0.55, 0.01)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const _canvas = { height: 800, width: 800 }
        var p = particle()
        p.position=[799, 500]
        p.velocity=[2,1]
        console.log(p)
        const {position} = update(p, 1.0, _canvas)
        console.log(position)
        expect(position[0]).to.closeTo(1, 0.05)
        expect(position[1]).to.closeTo(501, 0.05)
    })

})
