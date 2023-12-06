import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid'

interface PetDetails {
    id: number
    petName: string
    imageUrl: string
}

const PetDetail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [detailPetData, setDetailPetData] = useState<PetDetails | null>(null)

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/pets`)
                console.log('Pet Detail Response:', response.data[0])
                setDetailPetData(response.data[0])
            } catch (error) {
                console.error('Error fetching pet details:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPetDetails()
    }, [id])

    console.log('Detail Pet Data:', detailPetData)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!detailPetData) {
        return <div>No data found for the specified pet ID.</div>
    }

    return (
        <div className="pet-detail">
            <h2>{detailPetData.petName} Details</h2>

            <div className="pet-wrapper">
                <div className="pet-header">
                    <p>ID: {detailPetData.id}</p>
                </div>

                <div className="pet-content">
                    <p>Pet Name: {detailPetData.petName}</p>
                    <p>Image: {detailPetData.imageUrl}</p>
                </div>
            </div>

            <div className="grid-2">
                <Link to={`/pet/modify/${detailPetData.id}`}>
                    <button>Modify</button>
                </Link>
                <Link to="/pets">
                    <button>List</button>
                </Link>
            </div>
        </div>
    )
}

export default PetDetail
