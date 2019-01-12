import React from 'react';
import { Card, Image, Button, Grid, List } from 'semantic-ui-react';

const Team = ({ team, onPokeRemove }) => (
  <div id="team">
    <Card.Group>
    {team.map(poke => <Card key={poke.id}>
      <Image floated='left' size='tiny' src={poke.sprite} centered/>
      <Card.Content>
        <Card.Header>{poke.name}</Card.Header>
        <Card.Description>
          <Grid>
            <Grid.Column>
              <List divided relaxed>
                <List.Item>
                  <List.Content>
                    <List.Header>Type 1</List.Header>
                    <List.Description>{poke.type1}</List.Description>
                  </List.Content>
                </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>HP</List.Header>
                      <List.Description>{poke.hp}</List.Description>
                    </List.Content>
                  </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Attack</List.Header>
                    <List.Description>{poke.attack}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Defense</List.Header>
                    <List.Description>{poke.defense}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List divided relaxed>
                  <List.Item>
                    <List.Content>
                      <List.Header>Type 2</List.Header>
                      <List.Description>{poke.type2}</List.Description>
                    </List.Content>
                  </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Speed</List.Header>
                    <List.Description>{poke.speed}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Special Attack</List.Header>
                    <List.Description>{poke["sp_attack"]}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Defense</List.Header>
                    <List.Description>{poke["sp_defense"]}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color='red' onClick={() => onPokeRemove(poke.id)}>Remove</Button>
      </Card.Content>
    </Card>)}
    </Card.Group>
  </div>
)

export default Team;