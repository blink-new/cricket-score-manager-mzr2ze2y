import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Plus, Trophy, Users, Calendar, Target, Play, Edit, Trash2 } from 'lucide-react'

interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: 'upcoming' | 'ongoing' | 'completed'
  createdAt: string
}

interface Team {
  id: string
  name: string
  shortName: string
  tournamentId: string
  createdAt: string
}

interface Player {
  id: string
  name: string
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper'
  teamId: string
  createdAt: string
}

interface Match {
  id: string
  tournamentId: string
  team1Id: string
  team2Id: string
  team1Score: number
  team2Score: number
  team1Wickets: number
  team2Wickets: number
  team1Overs: number
  team2Overs: number
  status: 'upcoming' | 'live' | 'completed'
  currentInnings: 1 | 2
  createdAt: string
}

function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [activeTab, setActiveTab] = useState('tournaments')

  // Tournament form state
  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  })

  // Team form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    shortName: ''
  })

  // Player form state
  const [playerForm, setPlayerForm] = useState({
    name: '',
    role: 'batsman' as Player['role']
  })

  // Match form state
  const [matchForm, setMatchForm] = useState({
    team1Id: '',
    team2Id: ''
  })

  // Initialize with sample data
  useEffect(() => {
    const sampleTournaments: Tournament[] = [
      {
        id: '1',
        name: 'Summer Cricket League 2024',
        description: 'Annual summer cricket tournament with exciting matches',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        status: 'ongoing',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Winter Cup 2024',
        description: 'Winter cricket championship',
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        status: 'upcoming',
        createdAt: new Date().toISOString()
      }
    ]

    const sampleTeams: Team[] = [
      {
        id: '1',
        name: 'Mumbai Warriors',
        shortName: 'MUM',
        tournamentId: '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Delhi Capitals',
        shortName: 'DEL',
        tournamentId: '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Chennai Super Kings',
        shortName: 'CSK',
        tournamentId: '1',
        createdAt: new Date().toISOString()
      }
    ]

    const samplePlayers: Player[] = [
      // Mumbai Warriors
      { id: '1', name: 'Rohit Sharma', role: 'batsman', teamId: '1', createdAt: new Date().toISOString() },
      { id: '2', name: 'Jasprit Bumrah', role: 'bowler', teamId: '1', createdAt: new Date().toISOString() },
      { id: '3', name: 'Hardik Pandya', role: 'all-rounder', teamId: '1', createdAt: new Date().toISOString() },
      // Delhi Capitals
      { id: '4', name: 'Rishabh Pant', role: 'wicket-keeper', teamId: '2', createdAt: new Date().toISOString() },
      { id: '5', name: 'Prithvi Shaw', role: 'batsman', teamId: '2', createdAt: new Date().toISOString() },
      { id: '6', name: 'Kagiso Rabada', role: 'bowler', teamId: '2', createdAt: new Date().toISOString() },
      // Chennai Super Kings
      { id: '7', name: 'MS Dhoni', role: 'wicket-keeper', teamId: '3', createdAt: new Date().toISOString() },
      { id: '8', name: 'Ravindra Jadeja', role: 'all-rounder', teamId: '3', createdAt: new Date().toISOString() },
      { id: '9', name: 'Deepak Chahar', role: 'bowler', teamId: '3', createdAt: new Date().toISOString() }
    ]

    const sampleMatches: Match[] = [
      {
        id: '1',
        tournamentId: '1',
        team1Id: '1',
        team2Id: '2',
        team1Score: 185,
        team2Score: 142,
        team1Wickets: 6,
        team2Wickets: 8,
        team1Overs: 20,
        team2Overs: 18.4,
        status: 'completed',
        currentInnings: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        tournamentId: '1',
        team1Id: '2',
        team2Id: '3',
        team1Score: 156,
        team2Score: 89,
        team1Wickets: 4,
        team2Wickets: 3,
        team1Overs: 20,
        team2Overs: 12.2,
        status: 'live',
        currentInnings: 2,
        createdAt: new Date().toISOString()
      }
    ]

    setTournaments(sampleTournaments)
    setTeams(sampleTeams)
    setPlayers(samplePlayers)
    setMatches(sampleMatches)
  }, [])

  const handleCreateTournament = () => {
    if (!tournamentForm.name) return

    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentForm.name,
      description: tournamentForm.description,
      startDate: tournamentForm.startDate,
      endDate: tournamentForm.endDate,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    }

    setTournaments(prev => [...prev, newTournament])
    setTournamentForm({ name: '', description: '', startDate: '', endDate: '' })
  }

  const handleCreateTeam = () => {
    if (!teamForm.name || !selectedTournament) return

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamForm.name,
      shortName: teamForm.shortName || teamForm.name.substring(0, 3).toUpperCase(),
      tournamentId: selectedTournament.id,
      createdAt: new Date().toISOString()
    }

    setTeams(prev => [...prev, newTeam])
    setTeamForm({ name: '', shortName: '' })
  }

  const handleCreatePlayer = () => {
    if (!playerForm.name || !selectedTeam) return

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerForm.name,
      role: playerForm.role,
      teamId: selectedTeam.id,
      createdAt: new Date().toISOString()
    }

    setPlayers(prev => [...prev, newPlayer])
    setPlayerForm({ name: '', role: 'batsman' })
  }

  const handleCreateMatch = () => {
    if (!matchForm.team1Id || !matchForm.team2Id || !selectedTournament) return

    const newMatch: Match = {
      id: Date.now().toString(),
      tournamentId: selectedTournament.id,
      team1Id: matchForm.team1Id,
      team2Id: matchForm.team2Id,
      team1Score: 0,
      team2Score: 0,
      team1Wickets: 0,
      team2Wickets: 0,
      team1Overs: 0,
      team2Overs: 0,
      status: 'upcoming',
      currentInnings: 1,
      createdAt: new Date().toISOString()
    }

    setMatches(prev => [...prev, newMatch])
    setMatchForm({ team1Id: '', team2Id: '' })
  }

  const updateMatchScore = (matchId: string, field: keyof Match, value: number) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId ? { ...match, [field]: value } : match
    ))
  }

  const handleDeleteTournament = (tournamentId: string) => {
    // Remove tournament and all associated data
    setTournaments(prev => prev.filter(t => t.id !== tournamentId))
    setMatches(prev => prev.filter(m => m.tournamentId !== tournamentId))
    const tournamentTeams = teams.filter(t => t.tournamentId === tournamentId)
    const teamIds = tournamentTeams.map(t => t.id)
    setTeams(prev => prev.filter(t => t.tournamentId !== tournamentId))
    setPlayers(prev => prev.filter(p => !teamIds.includes(p.teamId)))
    
    // Clear selections if they were deleted
    if (selectedTournament?.id === tournamentId) {
      setSelectedTournament(null)
    }
    if (selectedTeam && teamIds.includes(selectedTeam.id)) {
      setSelectedTeam(null)
    }
    if (selectedMatch && selectedMatch.tournamentId === tournamentId) {
      setSelectedMatch(null)
    }
  }

  const handleDeleteTeam = (teamId: string) => {
    // Remove team and all associated data
    setTeams(prev => prev.filter(t => t.id !== teamId))
    setPlayers(prev => prev.filter(p => p.teamId !== teamId))
    setMatches(prev => prev.filter(m => m.team1Id !== teamId && m.team2Id !== teamId))
    
    // Clear selections if they were deleted
    if (selectedTeam?.id === teamId) {
      setSelectedTeam(null)
    }
    if (selectedMatch && (selectedMatch.team1Id === teamId || selectedMatch.team2Id === teamId)) {
      setSelectedMatch(null)
    }
  }

  const handleDeletePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId))
  }

  const handleDeleteMatch = (matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId))
    
    // Clear selection if it was deleted
    if (selectedMatch?.id === matchId) {
      setSelectedMatch(null)
    }
  }

  const getTeamsForTournament = (tournamentId: string) => {
    return teams.filter(team => team.tournamentId === tournamentId)
  }

  const getPlayersForTeam = (teamId: string) => {
    return players.filter(player => player.teamId === teamId)
  }

  const getMatchesForTournament = (tournamentId: string) => {
    return matches.filter(match => match.tournamentId === tournamentId)
  }

  const getTeamById = (teamId: string) => {
    return teams.find(team => team.id === teamId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Cricket Score Manager</h1>
            </div>
            <div className="text-sm text-gray-600">
              No login required - Start managing cricket scores instantly!
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tournaments" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Tournaments</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Teams</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Matches</span>
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Live Scoring</span>
            </TabsTrigger>
          </TabsList>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Cricket Tournaments</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cricket-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Tournament
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Tournament</DialogTitle>
                    <DialogDescription>
                      Set up a new cricket tournament to manage teams and matches.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tournament-name">Tournament Name</Label>
                      <Input
                        id="tournament-name"
                        value={tournamentForm.name}
                        onChange={(e) => setTournamentForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Summer Cricket League 2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tournament-description">Description</Label>
                      <Textarea
                        id="tournament-description"
                        value={tournamentForm.description}
                        onChange={(e) => setTournamentForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the tournament"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={tournamentForm.startDate}
                          onChange={(e) => setTournamentForm(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={tournamentForm.endDate}
                          onChange={(e) => setTournamentForm(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreateTournament} className="w-full cricket-gradient">
                      Create Tournament
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tournament.name}</CardTitle>
                      <Badge 
                        className={
                          tournament.status === 'ongoing' ? 'match-status-live' :
                          tournament.status === 'upcoming' ? 'match-status-upcoming' :
                          'match-status-completed'
                        }
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                    <CardDescription>{tournament.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{tournament.startDate} - {tournament.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{getTeamsForTournament(tournament.id).length} teams</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>{getMatchesForTournament(tournament.id).length} matches</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        onClick={() => {
                          setSelectedTournament(tournament)
                          setActiveTab('teams')
                        }}
                      >
                        Manage Teams
                      </Button>
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        onClick={() => {
                          setSelectedTournament(tournament)
                          setActiveTab('matches')
                        }}
                      >
                        View Matches
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tournament</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{tournament.name}"? This will permanently remove the tournament and all associated teams, players, and matches. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteTournament(tournament.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Tournament
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
                {selectedTournament && (
                  <p className="text-gray-600">Managing teams for {selectedTournament.name}</p>
                )}
              </div>
              {selectedTournament && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cricket-gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team</DialogTitle>
                      <DialogDescription>
                        Add a team to {selectedTournament.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input
                          id="team-name"
                          value={teamForm.name}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Mumbai Warriors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="team-short">Short Name (3 letters)</Label>
                        <Input
                          id="team-short"
                          value={teamForm.shortName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, shortName: e.target.value.toUpperCase() }))}
                          placeholder="e.g., MUM"
                          maxLength={3}
                        />
                      </div>
                      <Button onClick={handleCreateTeam} className="w-full cricket-gradient">
                        Add Team
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {!selectedTournament ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a tournament</h3>
                <p className="text-gray-600 mb-4">Choose a tournament from the tournaments tab to manage teams</p>
                <Button onClick={() => setActiveTab('tournaments')} variant="outline">
                  Go to Tournaments
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTeamsForTournament(selectedTournament.id).map((team) => (
                  <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{team.name}</span>
                        <Badge variant="secondary">{team.shortName}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{getPlayersForTeam(team.id).length} players</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          className="flex-1" 
                          variant="outline"
                          onClick={() => setSelectedTeam(team)}
                        >
                          Manage Players
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Team</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{team.name}"? This will permanently remove the team and all its players, and cancel any matches involving this team. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteTeam(team.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Team
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Player Management Modal */}
            {selectedTeam && (
              <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Manage Players - {selectedTeam.name}</DialogTitle>
                    <DialogDescription>
                      Add and manage players for this team
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Add Player Form */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h4 className="font-medium">Add New Player</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="player-name">Player Name</Label>
                          <Input
                            id="player-name"
                            value={playerForm.name}
                            onChange={(e) => setPlayerForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Virat Kohli"
                          />
                        </div>
                        <div>
                          <Label htmlFor="player-role">Role</Label>
                          <select
                            id="player-role"
                            value={playerForm.role}
                            onChange={(e) => setPlayerForm(prev => ({ ...prev, role: e.target.value as Player['role'] }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="batsman">Batsman</option>
                            <option value="bowler">Bowler</option>
                            <option value="all-rounder">All-rounder</option>
                            <option value="wicket-keeper">Wicket-keeper</option>
                          </select>
                        </div>
                      </div>
                      <Button onClick={handleCreatePlayer} className="cricket-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </div>

                    {/* Players List */}
                    <div>
                      <h4 className="font-medium mb-4">Team Players ({getPlayersForTeam(selectedTeam.id).length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getPlayersForTeam(selectedTeam.id).map((player) => (
                          <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-gray-600 capitalize">{player.role}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {player.role}
                              </Badge>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Player</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove "{player.name}" from the team? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeletePlayer(player.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Remove Player
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                        {getPlayersForTeam(selectedTeam.id).length === 0 && (
                          <p className="text-gray-500 text-center py-4">No players added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Matches</h2>
                {selectedTournament && (
                  <p className="text-gray-600">Matches for {selectedTournament.name}</p>
                )}
              </div>
              {selectedTournament && getTeamsForTournament(selectedTournament.id).length >= 2 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cricket-gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Match
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Match</DialogTitle>
                      <DialogDescription>
                        Set up a match between two teams
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="team1">Team 1</Label>
                        <select
                          id="team1"
                          value={matchForm.team1Id}
                          onChange={(e) => setMatchForm(prev => ({ ...prev, team1Id: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select Team 1</option>
                          {getTeamsForTournament(selectedTournament.id).map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="team2">Team 2</Label>
                        <select
                          id="team2"
                          value={matchForm.team2Id}
                          onChange={(e) => setMatchForm(prev => ({ ...prev, team2Id: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select Team 2</option>
                          {getTeamsForTournament(selectedTournament.id)
                            .filter(team => team.id !== matchForm.team1Id)
                            .map(team => (
                              <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                      </div>
                      <Button onClick={handleCreateMatch} className="w-full cricket-gradient">
                        Create Match
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {!selectedTournament ? (
              <div className="text-center py-12">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a tournament</h3>
                <p className="text-gray-600 mb-4">Choose a tournament to view and manage matches</p>
                <Button onClick={() => setActiveTab('tournaments')} variant="outline">
                  Go to Tournaments
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {getMatchesForTournament(selectedTournament.id).map((match) => {
                  const team1 = getTeamById(match.team1Id)
                  const team2 = getTeamById(match.team2Id)
                  
                  return (
                    <Card key={match.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-8">
                            <div className="text-center">
                              <div className="font-semibold text-lg">{team1?.shortName}</div>
                              <div className="text-sm text-gray-600">{team1?.name}</div>
                              <div className="text-2xl font-bold text-green-600">
                                {match.team1Score}/{match.team1Wickets}
                              </div>
                              <div className="text-sm text-gray-500">{match.team1Overs} overs</div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-lg font-medium text-gray-500">VS</div>
                              <Badge 
                                className={
                                  match.status === 'live' ? 'match-status-live' :
                                  match.status === 'upcoming' ? 'match-status-upcoming' :
                                  'match-status-completed'
                                }
                              >
                                {match.status}
                              </Badge>
                            </div>
                            
                            <div className="text-center">
                              <div className="font-semibold text-lg">{team2?.shortName}</div>
                              <div className="text-sm text-gray-600">{team2?.name}</div>
                              <div className="text-2xl font-bold text-green-600">
                                {match.team2Score}/{match.team2Wickets}
                              </div>
                              <div className="text-sm text-gray-500">{match.team2Overs} overs</div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedMatch(match)
                                setActiveTab('scoring')
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Update Score
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Match</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this match between {team1?.name} and {team2?.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteMatch(match.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete Match
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                
                {getMatchesForTournament(selectedTournament.id).length === 0 && (
                  <div className="text-center py-12">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
                    <p className="text-gray-600 mb-4">
                      {getTeamsForTournament(selectedTournament.id).length < 2 
                        ? 'Add at least 2 teams to create matches'
                        : 'Create your first match to get started'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Live Scoring Tab */}
          <TabsContent value="scoring" className="space-y-6">
            {selectedMatch ? (
              <div className="space-y-6">
                {/* Header with Match Status Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Live Scoring</h2>
                    <div className="flex items-center space-x-2">
                      {selectedMatch.status === 'live' && (
                        <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-700 font-medium text-sm">LIVE</span>
                        </div>
                      )}
                      {selectedMatch.status === 'upcoming' && (
                        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-blue-700 font-medium text-sm">UPCOMING</span>
                        </div>
                      )}
                      {selectedMatch.status === 'completed' && (
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-700 font-medium text-sm">COMPLETED</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedMatch(null)}
                  >
                    Back to Matches
                  </Button>
                </div>

                {/* Main Scoreboard */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* Team 1 */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {getTeamById(selectedMatch.team1Id)?.shortName}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {getTeamById(selectedMatch.team1Id)?.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {selectedMatch.team1Score}
                        </span>
                        <span className="text-2xl text-gray-600">
                          /{selectedMatch.team1Wickets}
                        </span>
                        <span className="text-lg text-gray-500 ml-2">
                          ({selectedMatch.team1Overs} ov)
                        </span>
                      </div>
                    </div>

                    {/* VS and Status */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
                      {selectedMatch.status === 'live' && (
                        <div className="text-sm text-gray-600">
                          {selectedMatch.currentInnings === 1 ? 
                            `${getTeamById(selectedMatch.team1Id)?.shortName} batting` : 
                            `${getTeamById(selectedMatch.team2Id)?.shortName} batting`
                          }
                        </div>
                      )}
                      {selectedMatch.status === 'completed' && (
                        <div className="text-sm font-medium text-green-600">
                          Match Completed
                        </div>
                      )}
                      {selectedMatch.status === 'upcoming' && (
                        <div className="text-sm text-blue-600">
                          Match Not Started
                        </div>
                      )}
                    </div>

                    {/* Team 2 */}
                    <div className="text-center lg:text-right">
                      <div className="flex items-center justify-center lg:justify-end space-x-3 mb-2">
                        <div className="lg:order-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {getTeamById(selectedMatch.team2Id)?.shortName}
                            </span>
                          </div>
                        </div>
                        <div className="lg:order-1">
                          <h3 className="font-bold text-lg text-gray-900">
                            {getTeamById(selectedMatch.team2Id)?.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-center lg:justify-end space-x-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {selectedMatch.team2Score}
                        </span>
                        <span className="text-2xl text-gray-600">
                          /{selectedMatch.team2Wickets}
                        </span>
                        <span className="text-lg text-gray-500 ml-2">
                          ({selectedMatch.team2Overs} ov)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Status Controls */}
                <div className="flex justify-center space-x-2">
                  <Button
                    size="sm"
                    variant={selectedMatch.status === 'upcoming' ? 'default' : 'outline'}
                    onClick={() => updateMatchScore(selectedMatch.id, 'status', 'upcoming' as any)}
                    className={selectedMatch.status === 'upcoming' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  >
                    Upcoming
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMatch.status === 'live' ? 'default' : 'outline'}
                    onClick={() => updateMatchScore(selectedMatch.id, 'status', 'live' as any)}
                    className={selectedMatch.status === 'live' ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    Start Live
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMatch.status === 'completed' ? 'default' : 'outline'}
                    onClick={() => updateMatchScore(selectedMatch.id, 'status', 'completed' as any)}
                    className={selectedMatch.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    End Match
                  </Button>
                </div>

                {/* Score Update Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Team 1 Scoring */}
                  <Card className="border-blue-200 bg-blue-50/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {getTeamById(selectedMatch.team1Id)?.shortName}
                          </span>
                        </div>
                        <span>{getTeamById(selectedMatch.team1Id)?.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Runs</Label>
                          <Input
                            type="number"
                            value={selectedMatch.team1Score}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team1Score', parseInt(e.target.value) || 0)}
                            className="text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Wickets</Label>
                          <Input
                            type="number"
                            value={selectedMatch.team1Wickets}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team1Wickets', parseInt(e.target.value) || 0)}
                            max="10"
                            className="text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Overs</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={selectedMatch.team1Overs}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team1Overs', parseFloat(e.target.value) || 0)}
                            className="text-center font-bold text-lg"
                          />
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedMatch.team1Score}/{selectedMatch.team1Wickets}
                        </div>
                        <div className="text-sm text-gray-500">
                          ({selectedMatch.team1Overs} overs)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Team 2 Scoring */}
                  <Card className="border-red-200 bg-red-50/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {getTeamById(selectedMatch.team2Id)?.shortName}
                          </span>
                        </div>
                        <span>{getTeamById(selectedMatch.team2Id)?.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Runs</Label>
                          <Input
                            type="number"
                            value={selectedMatch.team2Score}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team2Score', parseInt(e.target.value) || 0)}
                            className="text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Wickets</Label>
                          <Input
                            type="number"
                            value={selectedMatch.team2Wickets}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team2Wickets', parseInt(e.target.value) || 0)}
                            max="10"
                            className="text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Overs</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={selectedMatch.team2Overs}
                            onChange={(e) => updateMatchScore(selectedMatch.id, 'team2Overs', parseFloat(e.target.value) || 0)}
                            className="text-center font-bold text-lg"
                          />
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedMatch.team2Score}/{selectedMatch.team2Wickets}
                        </div>
                        <div className="text-sm text-gray-500">
                          ({selectedMatch.team2Overs} overs)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Match Summary */}
                {selectedMatch.status === 'completed' && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold text-green-800 mb-2">Match Result</h3>
                      <p className="text-green-700">
                        {selectedMatch.team1Score > selectedMatch.team2Score 
                          ? `${getTeamById(selectedMatch.team1Id)?.name} won by ${selectedMatch.team1Score - selectedMatch.team2Score} runs`
                          : selectedMatch.team2Score > selectedMatch.team1Score
                          ? `${getTeamById(selectedMatch.team2Id)?.name} won by ${selectedMatch.team2Score - selectedMatch.team1Score} runs`
                          : 'Match tied'
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a match to score</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Choose any match from the matches tab and start updating live scores with our intuitive scoring interface
                </p>
                <Button onClick={() => setActiveTab('matches')} className="cricket-gradient">
                  Browse Matches
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App