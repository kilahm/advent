package main

import (
	"fmt"
)

func main() {
	currentState := testInput()

	statePairs := statePairs{
		{currentState[0], currentState[1]},
		{currentState[0], currentState[2]},
		{currentState[0], currentState[3]},
		{currentState[1], currentState[2]},
		{currentState[1], currentState[3]},
		{currentState[2], currentState[3]},
	}

	history := stateHistory{make(map[string]void), "initial"}

	for true {
		if history.has(currentState) {
			break
		}
		fmt.Println(history.last)

		history.add(currentState)
		statePairs.accelerate()
		currentState.move()
	}

	fmt.Print(len(history.stateHistory))

}

type state []*body

func (s state) serialize() string {
	serialized := ""
	for i := 0; i < len(s); i++ {
		serialized = fmt.Sprintf("%s|%d:%d:%d:%d:%d:%d", serialized, s[i].position.x, s[i].position.y, s[i].position.z, s[i].velocity.x, s[i].velocity.y, s[i].velocity.z)
	}
	return serialized
}

func (s state) move() {
	for i := 0; i < len(s); i++ {
		s[i].position.x += s[i].velocity.x
		s[i].position.y += s[i].velocity.y
		s[i].position.z += s[i].velocity.z
	}
}

type statePairs [][]*body

func (sp statePairs) accelerate() {
	for pairIndex := 0; pairIndex < len(sp); pairIndex++ {
		a := sp[pairIndex][0]
		b := sp[pairIndex][1]
		if a.position.x < b.position.x {
			a.velocity.x += 1
			b.velocity.x -= 1
		}
		if a.position.x > b.position.x {
			a.velocity.x -= 1
			b.velocity.x += 1
		}
		if a.position.y < b.position.y {
			a.velocity.y += 1
			b.velocity.y -= 1
		}
		if a.position.y > b.position.y {
			a.velocity.y -= 1
			b.velocity.y += 1
		}
		if a.position.z < b.position.z {
			a.velocity.z += 1
			b.velocity.z -= 1
		}
		if a.position.z > b.position.z {
			a.velocity.z -= 1
			b.velocity.z += 1
		}
	}
}

type stateHistory struct {
	stateHistory map[string]void
	last         string
}

func (sh *stateHistory) add(s state) {
	serialized := s.serialize()
	sh.stateHistory[serialized] = void{}
	sh.last = serialized
}

func (sh *stateHistory) has(s state) bool {
	_, ok := sh.stateHistory[s.serialize()]
	return ok
}

type body struct {
	position vector
	velocity vector
}

type vector struct {
	x int
	y int
	z int
}

type void struct{}

func testInput() state {
	return state{
		{
			position: vector{
				x: -1,
				y: 0,
				z: 2,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: 2,
				y: -10,
				z: -7,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: 4,
				y: -8,
				z: 8,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: 3,
				y: 5,
				z: -1,
			},
			velocity: vector{},
		},
	}
}
func realInput() state {
	return state{
		{
			position: vector{
				x: 4,
				y: 1,
				z: 1,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: 11,
				y: -18,
				z: -1,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: -2,
				y: -10,
				z: -4,
			},
			velocity: vector{},
		},
		{
			position: vector{
				x: -7,
				y: -2,
				z: 14,
			},
			velocity: vector{},
		},
	}
}
