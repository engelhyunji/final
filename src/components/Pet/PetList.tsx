import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import { Pagination, Table, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const PetList = () => {
    const [petList, setPetList] = useState<PetType[]>([])
    const [currentPets, setCurrentPets] = useState<PetType[]>([])
    const [page, setPage] = useState<number>(1)
    const petsPerPage = 5
    const indexOfLastPet = page * petsPerPage
    const indexOfFirstPet = indexOfLastPet - petsPerPage
    const petListLength = petList.length

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        axios
            .get('http://localhost:4000/pets')
            .then((response) => {
                setPetList([...response.data].reverse())
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const reversedPets = [...petList].reverse()

        setCurrentPets(reversedPets.slice(indexOfFirstPet, indexOfLastPet))
    }, [petList, page])

    return (
        <Container className="pet-list">
            <h2 className="mb-4">Pet List</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Pet Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPets.map((pet, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="pet-name">
                                <Link to={`/pets/${pet.id}`}>{pet.petName}</Link>
                            </td>
                            <td>{dayjs(pet.created_at).format('YYYY.MM.DD')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                {[...Array(Math.ceil(petListLength / petsPerPage))].map((_, i) => (
                    <Pagination.Item key={i} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(page + 1)} />
            </Pagination>

            <Link to="/pet">
                <Button className="mt-3" style={{ backgroundColor: '#808080', borderColor: '#808080' }}>
                    Add Pet
                </Button>
            </Link>
        </Container>
    )
}

export default PetList
