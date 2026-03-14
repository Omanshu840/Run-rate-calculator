import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

const TeamCardss = ({ teams }) => {
    return (
        <Row className="justify-content-center mt-5">
            {teams.map((team, index) => (
                <Col key={index} md={4} sm={6} xs={12} className="mb-4">
                    <Card className="pt-3" style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "none", backgroundColor: "var(--priColor2)"}}>
                        <Card.Img
                            variant="top"
                            src={team.TeamLogo}
                            alt={team.name}
                            style={{ height: "100px", objectFit: "contain", backgroundColor: "var(--priColor2)" }}
                        />
                        <Card.Body style={{backgroundColor: 'var(--priColor2)'}}>
                            <Card.Title style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold", color: "var(--secColor1)"}}>
                                {team.name}
                            </Card.Title>
                            <Card.Text style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--btnColor)" }}>
                                Matches: <strong>{team.Matches}</strong> | Wins: <strong>{team.Wins}</strong> | Losses: <strong>{team.Loss}</strong>
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--btnColor)" }}>
                                Tied: {team.Tied} | No Result: {team.NoResult}
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: "var(--secColor1)" }}>
                                Run Rate: {team.runRate}
                            </Card.Text>
                            {team.IsQualified && 
                                <Card.Footer style={{ textAlign: "center", backgroundColor: "#f1f1f1", borderRadius: "0 0 12px 12px" }}>
                                    <span style={{ fontWeight: "bold", color: team.IsQualified ? "green" : "red" }}>
                                        {"Qualified ✅"}
                                    </span>
                                </Card.Footer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

const TeamCards = ({ teams }) => {
    return (
        <div className="mt-5">
            {teams.map((team, index) => (
                <Card
                    key={index}
                    style={{
                        marginBottom: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                        border: "none",
                        backgroundColor: "var(--priColor2)",
                        color: "var(--secColor2)"
                    }}
                >
                    <div
                        className="align-items-center gx-2 points-table"
                        style={{ flexWrap: "nowrap", overflowX: "auto" }}
                    >
                        <Col style={{textAlign: 'left'}}>
                            <Image
                                src={team.TeamLogo}
                                alt={team.name}
                                roundedCircle
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    objectFit: "contain",
                                    backgroundColor: "var(--priColor2)",
                                }}
                            />
                        </Col>
                        {team.IsQualified &&
                            <Col style={{textAlign: 'left'}}>
                                <span style={{ color: team.IsQualified ? "green" : "red" }}>
                                    { "✅"}
                                </span>
                            </Col>
                        }
                        {/* <Col><strong>{team.name}</strong></Col> */}
                        <Col style={{textAlign: 'left'}}>{team.Matches}</Col>
                        <Col style={{color: "var(--secColor1)", textAlign: 'left'}}>{team.Wins}</Col>
                        <Col style={{textAlign: 'left'}}>{team.Loss}</Col>
                        <Col style={{textAlign: 'left'}}>{team.Tied + team.NoResult}</Col>
                        <Col style={{color: "var(--secColor1)", textAlign: 'left'}}><b>{team.Points}</b></Col>
                        <Col style={{color: "var(--secColor1)", textAlign: 'left'}}>{team.runRate}</Col>
                        <Col style={{textAlign: 'left'}}>{team.Performance}</Col>
                    
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default TeamCards;
